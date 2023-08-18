export class GetBalanceCurrencyDto {
  currency: string;
  amount: number;
}
export class GetBalanceWithdrawsDto {
  withdrawns: GetBalanceCurrencyDto[];
  withdrawings: GetBalanceCurrencyDto[];
}
