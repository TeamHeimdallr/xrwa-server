import { Injectable } from '@nestjs/common';
import { Deposit, DepositStatus } from '@prisma/client';

import { PrismaService } from '~/prisma/services/prisma.service';

import { CreateDepositDto } from '../dtos/request.dto';

@Injectable()
export class CBDCDepositService {
  constructor(private readonly prisma: PrismaService) {}

  async getDeposits(account: string): Promise<Deposit[]> {
    const deposits = await this.prisma.deposit.findMany({
      where: { account },
    });

    return deposits;
  }

  async createDeposit(data: CreateDepositDto): Promise<Deposit> {
    const created = await this.prisma.deposit.create({
      data: { ...data, status: DepositStatus.locked },
    });

    return created;
  }
}
