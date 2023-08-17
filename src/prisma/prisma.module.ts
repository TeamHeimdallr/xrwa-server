import { Module } from '@nestjs/common';

import { PrismaService } from '~/prisma/services/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
