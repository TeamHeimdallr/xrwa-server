export class GetDepositsDto {
  account: string;
}

export class CreateDepositDto {
  account: string;
  destination: string;

  amount: number;
  currency: string;

  date?: Date;

  exchangeRate: number;
  tx: string;
}
