import { Injectable, Logger } from '@nestjs/common';

import { PrismaService } from '~/prisma/services/prisma.service';

@Injectable()
export class HealthCheckService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(HealthCheckService.name);

  async getHealchChecks(): Promise<number> {
    this.logger.log('[CUSTOM LOG] - HealthCheckService.getHealchChecks()');
    const res = await this.prisma.healthCheck.count();

    this.logger.log(
      '[CUSTOM LOG] - HealthCheckService.getHealchChecks() - res: ' + res,
    );
    return res;
  }
}
