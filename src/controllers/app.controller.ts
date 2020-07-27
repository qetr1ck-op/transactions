import { Controller, Get, Post, Body } from '@nestjs/common';
import { HealthCheckService } from '../services/health-check.service';
import { MonoTransactionService } from 'src/services/mono-transaction.service';
import { TransactionRequest } from 'src/types/transaction';
import { GoogleSpreadsheetService } from 'src/services/google-spreadsheet.service';

@Controller()
export class AppController {
  constructor(
    private healthCheckService: HealthCheckService,
    private googleSpreadsheetService: GoogleSpreadsheetService,
    private monoTransactionService: MonoTransactionService,
  ) {}

  @Get('health-check')
  getHello(): string {
    return this.healthCheckService.check();
  }

  @Post('transactions')
  async postTransactions(@Body() body: TransactionRequest) {
    console.log(body);
    try {
      const {
        amount,
        date,
        monthIndex,
        description,
      } = this.monoTransactionService.parse(body);

      await this.googleSpreadsheetService.initSpreadsheetDocument();

      await this.googleSpreadsheetService.setActiveSpreadsheetByIndex(
        monthIndex,
      );

      await this.googleSpreadsheetService.addRow({
        [this.googleSpreadsheetService.headers.date]: date,
        [this.googleSpreadsheetService.headers.expense]: amount,
        [this.googleSpreadsheetService.headers.remarks]: description,
      });

      return { status: 'OK', code: 201 };
    } catch (e) {
      console.error(e);
      return { code: 500, message: e };
    }
  }
}
