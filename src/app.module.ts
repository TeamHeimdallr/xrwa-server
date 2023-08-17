import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ContractsModule } from './domains/contracts/contracts.module';
import { HealthCheckModule } from './domains/health-check/health-check.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    HealthCheckModule,
    ContractsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
