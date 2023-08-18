import { Injectable } from '@nestjs/common';
import { DepositWithdraw, Status } from '@prisma/client';

import { PrismaService } from '~/prisma/services/prisma.service';

import { CreateDepositWithdrawDto } from '../dtos/request.dto';

@Injectable()
export class CBDCService {
  constructor(private readonly prisma: PrismaService) {}

  async getActivities(account: string): Promise<DepositWithdraw[]> {
    const withdraws = await this.prisma.depositWithdraw.findMany({
      where: { account },
    });

    return withdraws;
  }

  async createDepositWithdraw(
    data: CreateDepositWithdrawDto,
  ): Promise<DepositWithdraw> {
    const created = await this.prisma.depositWithdraw.create({
      data: { ...data, status: Status.locked },
    });

    return created;
  }
}
