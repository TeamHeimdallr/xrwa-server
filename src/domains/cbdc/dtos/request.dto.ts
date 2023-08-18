import { Status, Type } from '@prisma/client';

export class GetDepositsWithdrawDto {
  account: string;
}

export class CreateDepositWithdrawDto {
  type: Type;

  account: string;
  destination: string;

  amount: string;
  currency: string;

  status: Status;

  date?: Date;
  unlockDate?: Date;

  exchangeRate: number;
  tx: string;
}
