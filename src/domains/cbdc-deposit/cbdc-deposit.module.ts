import { Module } from '@nestjs/common';

import { PrismaModule } from '~/prisma/prisma.module';

import { CBDCDepositController } from './controllers/cbdc-deposit.controller';
import { CBDCDepositService } from './services/cbdc-deposit.service';

@Module({
  imports: [PrismaModule],
  controllers: [CBDCDepositController],
  providers: [CBDCDepositService],
})
export class CBDCDepositModule {}
