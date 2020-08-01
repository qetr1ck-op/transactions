import {
  TransactionParser,
  Transaction,
  MonoTransaction,
} from '../types/transaction';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MonoTransactionService implements TransactionParser {
  parse(transaction: MonoTransaction): Transaction {
    const transactionDate = this.toDateFromSeconds(transaction.time);
    const monthIndex = this.toTransactionMonthIndex(transactionDate);
    const date = this.toTransactionDate(transactionDate);
    const amount = this.toPrice(transaction.amount);
    // TODO: a smart description based on message
    const description = this.toDescription(transaction.description);

    return { id: transaction.id, monthIndex, date, amount, description };
  }

  private toTransactionDate(date: Date): string {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }

  private toTransactionMonthIndex(date: Date): number {
    const monthIndex = date.getMonth();
    const leftPadIndex = 2;

    return leftPadIndex + monthIndex;
  }

  private toPrice(amount: number): number {
    return Math.abs(amount / 100);
  }

  private toDescription(description: string) {
    return `🤖mono: ${description}`;
  }

  private toDateFromSeconds(seconds: number): Date {
    return new Date(seconds * 1000);
  }
}
