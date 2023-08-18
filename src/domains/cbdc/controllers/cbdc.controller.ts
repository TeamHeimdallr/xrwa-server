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

import {
  CreateDepositWithdrawDto,
  GetDepositsWithdrawDto,
} from '../dtos/request.dto';
import { CBDCService } from '../services/cbdc.service';

@Controller('cbdc')
export class CBDCController {
  constructor(private readonly cbdcService: CBDCService) {}

  @HttpCode(200)
  @ApiOperation({ summary: 'get all activities of account' })
  @ApiOkResponse()
  @Get('')
  async activities(
    @Res() res: Response,
    @Param() params: GetDepositsWithdrawDto,
  ) {
    const { account } = params;
    const activities = await this.cbdcService.getActivities(account);

    res.status(HttpStatus.OK).send({ data: activities });
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'get all activities of account' })
  @ApiOkResponse()
  @Get('balances')
  async balances(
    @Res() res: Response,
    @Param() params: GetDepositsWithdrawDto,
  ) {
    const { account } = params;
    const balances = await this.cbdcService.getBalances(account);

    res.status(HttpStatus.OK).send({ data: balances });
  }

  @HttpCode(201)
  @ApiOperation({ summary: 'create deposit' })
  @ApiCreatedResponse()
  @Post('')
  async deposit(@Res() res: Response, @Body() body: CreateDepositWithdrawDto) {
    await this.cbdcService.createDepositWithdraw(body);

    res.status(HttpStatus.CREATED).send();
  }
}
