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

import { CreateDepositDto, GetDepositsDto } from '../dtos/request.dto';
import { CBDCDepositService } from '../services/cbdc-deposit.service';

@Controller('cbdc/deposit')
export class CBDCDepositController {
  constructor(private readonly cbdcDepositService: CBDCDepositService) {}

  @HttpCode(200)
  @ApiOperation({ summary: 'get all deposits of account' })
  @ApiOkResponse()
  @Get('')
  async deposits(@Res() res: Response, @Param() params: GetDepositsDto) {
    const { account } = params;
    const deposits = await this.cbdcDepositService.getDeposits(account);

    res.status(HttpStatus.OK).send({ data: deposits });
  }

  @HttpCode(201)
  @ApiOperation({ summary: 'create deposit' })
  @ApiCreatedResponse()
  @Post('')
  async deposit(@Res() res: Response, @Body() body: CreateDepositDto) {
    const deposit = await this.cbdcDepositService.createDeposit(body);

    res.status(HttpStatus.CREATED).send({ data: deposit });
  }
}
