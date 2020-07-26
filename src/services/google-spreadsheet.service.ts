import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet';
import { EnvService } from './env.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleSpreadsheetService {
  private document: GoogleSpreadsheet;
  private spreadsheet: GoogleSpreadsheetWorksheet;

  headers = {
    date: 'Date',
    category: 'Category',
    expense: 'Expense',
    remarks: 'Remarks',
  };

  constructor(private envService: EnvService) {}

  async initSpreadsheetDocument() {
    // spreadsheet key is the long id in the sheets URL
    this.document = new GoogleSpreadsheet(
      this.envService.getEnv('GOOGLE_SPREADSHEET_ID'),
    );

    await this.useServiceAccountAuth();

    // loads sheets
    await this.document.loadInfo();
  }
  async addRow(rowData: { [header: string]: string | number | boolean }) {
    await this.spreadsheet.addRow(rowData);
  }

  async setActiveSpreadsheetByIndex(index: number) {
    this.spreadsheet = this.document.sheetsByIndex[index];

    await this.spreadsheet.loadHeaderRow();
  }

  private async useServiceAccountAuth(): Promise<void> {
    console.log(
      this.envService.getEnv('GOOGLE_PRIVATE_KEY').replace(/\\n/g, '\n'),
    );

    await this.document.useServiceAccountAuth({
      client_email: this.envService.getEnv('GOOGLE_SERVICE_ACCOUNT_EMAIL'),
      private_key: this.envService
        .getEnv('GOOGLE_PRIVATE_KEY')
        .replace(/\\n/g, '\n'),
    });
  }
}
