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
  @Get('activities')
  async activities(
    @Res() res: Response,
    @Param() params: GetDepositsWithdrawDto,
  ) {
    const { account } = params;
    const deposits = await this.cbdcService.getActivities(account);

    res.status(HttpStatus.OK).send({ data: deposits });
  }

  @HttpCode(201)
  @ApiOperation({ summary: 'create deposit' })
  @ApiCreatedResponse()
  @Post('deposit-withdraw')
  async deposit(@Res() res: Response, @Body() body: CreateDepositWithdrawDto) {
    const deposit = await this.cbdcService.createDepositWithdraw(body);

    res.status(HttpStatus.CREATED).send({ data: deposit });
  }
}
