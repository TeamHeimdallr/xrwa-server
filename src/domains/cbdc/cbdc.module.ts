import { Module } from '@nestjs/common';

import { PrismaModule } from '~/prisma/prisma.module';

import { SchedulerModule } from '../scheduler/schedule.module';
import { CBDCController } from './controllers/cbdc.controller';
import { CBDCService } from './services/cbdc.service';

@Module({
  imports: [PrismaModule, SchedulerModule],
  controllers: [CBDCController],
  providers: [CBDCService],
})
export class CBDCModule {}
