import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from '~/app.module';

import setupSwagger from './configs/setup-swagger';

const bootstrap = async () => {
  const origin = ['', 'http://localhost:3000'];

  const app = await NestFactory.create(AppModule, {
    cors: { origin, credentials: true },
    logger: ['log', 'error', 'warn'],
  });

  app.use(cookieParser());
  setupSwagger(app);

  await app.listen(8080);
};

bootstrap();
