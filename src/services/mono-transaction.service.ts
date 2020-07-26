import {
  TransactionParser,
  MonoTransactionRequest,
  Transaction,
} from '../types/transaction';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MonoTransactionService implements TransactionParser {
  parse(transaction: MonoTransactionRequest): Transaction {
    const monthIndex = this.toTransactionMonthIndex(transaction.time);
    const date = this.toTransactionDate(transaction.time);
    const amount = this.toPrice(transaction.amount);
    // TODO: a smart description
    const description = this.toDescription(transaction.description);

    return { id: transaction.id, monthIndex, date, amount, description };
  }

  private toTransactionDate(datestamp: number): string {
    const date = new Date(datestamp);

    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }

  private toTransactionMonthIndex(datestamp: number): number {
    const date = new Date(datestamp);
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
}
