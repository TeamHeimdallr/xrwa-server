import { WithdrawStatus } from '@prisma/client';

export class GetWithdrawsDto {
  account: string;
}

export class CreateWithdrawDto {
  account: string;
  destination: string;

  amount: number;
  currency: string;

  status: WithdrawStatus;

  date?: Date;
  unlockDate?: Date;

  exchangeRate: number;
  tx: string;
}
