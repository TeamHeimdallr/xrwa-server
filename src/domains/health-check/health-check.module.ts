import { Module } from '@nestjs/common';

import { PrismaService } from '~/prisma/services/prisma.service';

import { HealthCheckController } from './controllers/health-check.controller';
import { HealthCheckService } from './services/health-check.service';

@Module({
  imports: [],
  controllers: [HealthCheckController],
  providers: [PrismaService, HealthCheckService],
})
export class HealthCheckModule {}
