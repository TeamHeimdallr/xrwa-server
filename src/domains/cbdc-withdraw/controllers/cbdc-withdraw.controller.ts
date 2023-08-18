import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Response } from 'express';

import { CreateWithdrawDto, GetWithdrawsDto } from '../dtos/request.dto';
import { CBDCWithdrawService } from '../services/cbdc-withdraw.service';

@Controller('cbdc/withdraw')
export class CBDCWithdrawController {
  constructor(private readonly cbdcWithdrawService: CBDCWithdrawService) {}

  @HttpCode(200)
  @ApiOperation({ summary: 'get all withdraws of account' })
  @ApiOkResponse()
  @Get('')
  async withdraws(@Res() res: Response, @Param() params: GetWithdrawsDto) {
    const { account } = params;
    const deposits = await this.cbdcWithdrawService.getWithdraws(account);

    res.status(HttpStatus.OK).send({ data: deposits });
  }

  @HttpCode(201)
  @ApiOperation({ summary: 'create withdraws' })
  @ApiCreatedResponse()
  @Post('')
  async withdraw(@Res() res: Response, @Body() body: CreateWithdrawDto) {
    const deposit = await this.cbdcWithdrawService.createWithdraw(body);

    res.status(HttpStatus.CREATED).send({ data: deposit });
  }
}
