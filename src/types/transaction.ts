// https://api.monobank.ua/docs/
export interface MonoTransactionRequest {
  type: string;
  data: {
    account: string;
    statementItem: MonoTransaction;
  };
}

export interface MonoTransaction {
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
