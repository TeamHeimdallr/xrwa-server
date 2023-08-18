import { Module } from '@nestjs/common';

import { PrismaModule } from '~/prisma/prisma.module';

import { CBDCWithdrawController } from './controllers/cbdc-withdraw.controller';
import { CBDCWithdrawService } from './services/cbdc-withdraw.service';

@Module({
  imports: [PrismaModule],
  controllers: [CBDCWithdrawController],
  providers: [CBDCWithdrawService],
})
export class CBDCWithdrawModule {}
