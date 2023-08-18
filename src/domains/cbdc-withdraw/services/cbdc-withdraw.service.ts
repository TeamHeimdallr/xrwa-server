import { Injectable } from '@nestjs/common';
import { Withdraw } from '@prisma/client';

import { PrismaService } from '~/prisma/services/prisma.service';

import { CreateWithdrawDto } from '../dtos/request.dto';

@Injectable()
export class CBDCWithdrawService {
  constructor(private readonly prisma: PrismaService) {}

  async getWithdraws(account: string): Promise<Withdraw[]> {
    const withdraws = await this.prisma.withdraw.findMany({
      where: { account },
    });

    return withdraws;
  }

  async createWithdraw(data: CreateWithdrawDto): Promise<Withdraw> {
    const created = await this.prisma.withdraw.create({ data });

    return created;
  }
}
