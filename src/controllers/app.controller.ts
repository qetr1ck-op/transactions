import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { HealthCheckService } from '../services/health-check.service';
import { MonoTransactionService } from 'src/services/mono-transaction.service';
import { MonoTransactionRequest } from 'src/types/transaction';
import { GoogleSpreadsheetService } from 'src/services/google-spreadsheet.service';
import { Response } from 'express';

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

  @Post('transactions/mono')
  async postTransactions(
    @Body() body: MonoTransactionRequest,
    @Res() res: Response,
  ) {
    // TODO: validation
    // TODO: third-party logging
    console.log('Req', body);
    try {
      const {
        amount,
        date,
        monthIndex,
        description,
      } = this.monoTransactionService.parse(body.data.statementItem);

      await this.googleSpreadsheetService.initSpreadsheetDocument();

      await this.googleSpreadsheetService.setActiveSpreadsheetByIndex(
        monthIndex,
      );

      console.log('Res', { date, amount, monthIndex, description });

      await this.googleSpreadsheetService.addRow({
        [this.googleSpreadsheetService.headers.date]: date,
        [this.googleSpreadsheetService.headers.expense]: amount,
        [this.googleSpreadsheetService.headers.remarks]: description,
      });

      return res.sendStatus(200);
    } catch (e) {
      console.error(e);
      return { code: 500, message: e };
    }
  }
}
