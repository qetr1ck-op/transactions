import { MonoTransaction } from './transaction.type';
import { Transaction } from 'src/types/transaction';

const toTransactionDate = (date: Date): string => {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};

const toTransactionMonthIndex = (date: Date): number => {
  const monthIndex = date.getMonth();
  const leftPadIndex = 2;

  return leftPadIndex + monthIndex;
};

const toPrice = (amount: number): number => {
  return Math.abs(amount / 100);
};

const toDescription = (description: string): string => {
  return `🤖mono: ${description}`;
};

const toDateFromSeconds = (seconds: number): Date => {
  return new Date(seconds * 1000);
};

const toTransaction = (transaction: MonoTransaction): Transaction => {
  const date = toDateFromSeconds(transaction.time);

  return {
    id: transaction.id,
    monthIndex: toTransactionMonthIndex(date),
    date: toTransactionDate(date),
    amount: toPrice(transaction.amount),
    description: toDescription(transaction.description),
  };
};

export const monoParserService = {
  toTransaction,
};
