import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

import { PrismaService } from '~/prisma/services/prisma.service';

import { CreateScheduleDto } from '../dtos/request.dto';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly prisma: PrismaService,
  ) {}

  async createSchedule({
    scheduleId,
    unlockDate,

    callback,
  }: CreateScheduleDto) {
    await this.prisma.$transaction(async (tx) => {
      const remainTime = new Date(unlockDate).getTime() - Date.now();
      const handler = setTimeout(callback, remainTime);

      const createdSchedule = await tx.schedule.create({
        data: { scheduleId, unlockDate },
      });
      this.logger.log(`successfully create schedule - ${createdSchedule.id}`);

      const name = `schedule-${createdSchedule.id}`;

      const exist = this.schedulerRegistry.doesExist('timeout', name);
      if (exist) this.schedulerRegistry.deleteTimeout(name);
      this.schedulerRegistry.addTimeout(name, handler);

      this.logger.log(`successfully add timeout - ${name}`);
    });
  }

  async deleteSchedule(id: number) {
    await this.prisma.$transaction(async (tx) => {
      const deletedSchedule = await tx.schedule.delete({ where: { id } });
      this.logger.log(`successfully delete schedule - ${deletedSchedule.id}`);

      const name = `schedule-${deletedSchedule.id}`;

      const exist = this.schedulerRegistry.doesExist('timeout', name);
      if (exist) this.schedulerRegistry.deleteTimeout(name);
      this.logger.log(`successfully delete timeout - ${name}`);
    });
  }

  async deleteScheduleAll() {
    await this.prisma.$transaction(async (tx) => {
      const currentSchedules = await tx.schedule.findMany();
      await tx.schedule.deleteMany();
      this.logger.log(`successfully delete schedules all`);

      for (const schedule of currentSchedules) {
        const name = `schedule-${schedule.id}`;

        const exist = this.schedulerRegistry.doesExist('timeout', name);
        if (exist) this.schedulerRegistry.deleteTimeout(name);
        this.logger.log(`successfully deleted timeout - ${name}`);
      }
      this.logger.log(`successfully delete timeout all`);
    });
  }
}
