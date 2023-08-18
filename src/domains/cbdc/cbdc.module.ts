import { Module } from '@nestjs/common';

import { PrismaModule } from '~/prisma/prisma.module';

import { CBDCController } from './controllers/cbdc.controller';
import { CBDCService } from './services/cbdc.service';

@Module({
  imports: [PrismaModule],
  controllers: [CBDCController],
  providers: [CBDCService],
})
export class CBDCModule {}
