export class GetDepositsDto {
  account: string;
}

export class CreateDepositeDto {
  account: string;
  destination: string;

  amount: number;
  currency: string;

  date?: Date;

  exchangeRate: number;
  tx: string;
}
