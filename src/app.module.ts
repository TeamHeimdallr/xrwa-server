import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { CBDCDepositModule } from './domains/cbdc-deposit/cbdc-deposit.module';
import { HealthCheckModule } from './domains/health-check/health-check.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),

    HealthCheckModule,
    CBDCDepositModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
