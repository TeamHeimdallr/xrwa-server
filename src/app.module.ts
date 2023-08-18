import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { CBDCModule } from './domains/cbdc/cbdc.module';
import { HealthCheckModule } from './domains/health-check/health-check.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),

    HealthCheckModule,
    CBDCModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
