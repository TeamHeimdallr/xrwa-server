import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { DepositWithdraw, Status } from '@prisma/client';
import { differenceInMilliseconds } from 'date-fns';
import * as xrpl from 'xrpl';

import {
  BSD_WALLET_SEED,
  ENA_WALLET_SEED,
  KRW_WALLET_SEED,
  XRPL_WSS_TEST_NET,
} from '~/constants';
import { SchedulerService } from '~/domains/scheduler/services/scheduler.service';
import { PrismaService } from '~/prisma/services/prisma.service';

import { CreateDepositWithdrawDto } from '../dtos/request.dto';

@Injectable()
export class CBDCService {
  private logger = new Logger(CBDCService.name);
  private client: xrpl.Client;

  constructor(
    private readonly prisma: PrismaService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly schedulerService: SchedulerService,
  ) {
    this.client = new xrpl.Client(XRPL_WSS_TEST_NET);
  }

  onModuleInit() {
    this.retriveSchedule();
  }

  onModuleDestroy() {
    this.resetSchedule();
  }

  async getActivities(account: string): Promise<DepositWithdraw[]> {
    const withdraws = await this.prisma.depositWithdraw.findMany({
      where: { account },
    });

    return withdraws;
  }

  async withdraw(id: number): Promise<void> {
    await this.client.connect();

    const withdraw = await this.prisma.depositWithdraw.findUnique({
      where: { id },
    });
    if (!withdraw) return;

    const { account, currency, amount } = withdraw;

    const bsdWallet = xrpl.Wallet.fromSeed(BSD_WALLET_SEED);
    const enaWallet = xrpl.Wallet.fromSeed(ENA_WALLET_SEED);
    const krwWallet = xrpl.Wallet.fromSeed(KRW_WALLET_SEED);
    const cbdcWallet =
      currency === 'BSD'
        ? bsdWallet
        : currency === 'ENA'
        ? enaWallet
        : krwWallet;

    //// send token
    const sendTokenTx: xrpl.Payment = {
      TransactionType: 'Payment',
      Account: cbdcWallet.address,
      Amount: {
        currency,
        value: amount,
        issuer: cbdcWallet.address,
      },
      Destination: account,
      DestinationTag: 1,
    };

    const payPrepared = await this.client.autofill(sendTokenTx);
    const paySigned = cbdcWallet.sign(payPrepared);

    this.logger.log(
      `[CUSTOM_LOG] Sending ${amount} ${currency} to ${account}...`,
    );

    const payResult = await this.client.submitAndWait(paySigned.tx_blob);
    const payTxMeta = payResult?.result?.meta;
    if (
      typeof payTxMeta !== 'object' ||
      payTxMeta?.TransactionResult !== 'tesSUCCESS'
    ) {
      new BadRequestException(`Error sending transaction: ${payResult}`);
    }
    this.logger.log(
      `[CUSTOM_LOG] Transaction completed - https://testnet.xrpl.org/transactions/${paySigned.hash}`,
    );

    await this.client.disconnect();

    await this.prisma.$transaction(async (tx) => {
      await tx.depositWithdraw.update({
        where: { id },
        data: { status: Status.withdrawn },
      });
      await tx.schedule.delete({ where: { scheduleId: id } });
    });
  }

  async createDepositWithdraw(data: CreateDepositWithdrawDto): Promise<void> {
    const { type, unlockDate } = data;

    await this.prisma.$transaction(async (tx) => {
      // 락업이 필요한 케이스
      if (type === 'withdraw' && unlockDate) {
        const created = await tx.depositWithdraw.create({
          data: {
            ...data,
            status: Status.locked,
          },
        });
        await tx.schedule.create({
          data: { scheduleId: created.id },
        });

        return;
      }

      await tx.depositWithdraw.create({
        data: {
          ...data,
          status: type === 'deposit' ? 'locked' : 'withdrawn',
        },
      });
    });
  }

  async retriveSchedule() {
    const schedules = await this.prisma.schedule.findMany();
    const ids = schedules.map((schedule) => schedule.scheduleId);
    const withdraws = await this.prisma.depositWithdraw.findMany({
      where: { id: { in: ids } },
    });

    const promises = withdraws.map(async (withdraw) => {
      const { id, unlockDate } = withdraw;
      const name = `schedule-${id}`;

      const timeDiff = differenceInMilliseconds(
        new Date(unlockDate),
        new Date(),
      );

      const time = timeDiff < 0 ? 0 : timeDiff;
      if (time === 0) {
        await this.prisma.schedule.delete({ where: { scheduleId: id } });
        await this.prisma.depositWithdraw.update({
          where: { id },
          data: { status: Status.withdrawn },
        });
        return;
      }

      const callback = async () => {
        await this.withdraw(id);
      };

      const newTimeout = setTimeout(callback, time);
      const exist = this.schedulerRegistry.doesExist('timeout', name);
      if (exist) return;

      this.schedulerRegistry.addTimeout(name, newTimeout);
      this.logger.log(
        `[CUSTOM_LOG] schedule ${name} added - ${time}(${new Date(
          Date.now() + time,
        ).toISOString()})`,
      );
    });

    await Promise.all(promises);
    this.logger.log(`[CUSTOM_LOG] scheduler retrived`);
  }

  async resetSchedule() {
    await this.schedulerService.deleteScheduleAll();
    this.logger.log(`[CUSTOM_LOG] scheduler reset`);
  }
}
