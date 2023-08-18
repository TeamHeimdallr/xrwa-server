import { Module } from '@nestjs/common';

import { PrismaModule } from '~/prisma/prisma.module';

import { SchedulerService } from './services/scheduler.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [SchedulerService],
  exports: [SchedulerService],
})
export class SchedulerModule {}
