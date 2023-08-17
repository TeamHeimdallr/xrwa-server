import { Controller, Get } from '@nestjs/common';

import { HealthCheckService } from '../services/health-check.service';

@Controller('')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}
  @Get()
  ping(): string {
    return 'pong';
  }

  @Get('/ping-db')
  async pingDB(): Promise<number> {
    const res = await this.healthCheckService.getHealchChecks();
    return res;
  }
}
