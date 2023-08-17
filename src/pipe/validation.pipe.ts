import { ValidationPipe } from '@nestjs/common';

export const validationPipe = new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidUnknownValues: true,
});
