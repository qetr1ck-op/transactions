// https://api.monobank.ua/docs/
export interface MonoTransactionRequest {
  id: string;
  time: number;
  description: string;
  mcc: number;
  hold: boolean;
  amount: number;
  operationAmount: number;
  currencyCode: number;
  commissionRate: number;
  cashbackAmount: number;
  balance: number;
}

export type TransactionRequest = MonoTransactionRequest;

export interface Transaction {
  id: string;
  date: string;
  monthIndex: number;
  amount: number;
  description: string;
}

export interface TransactionParser {
  parse(t: any): Transaction;
}
