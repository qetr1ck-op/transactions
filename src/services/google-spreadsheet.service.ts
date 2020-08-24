import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet';
import { envService } from './env.service';

export class GoogleSpreadsheetService {
  private document: GoogleSpreadsheet;
  private spreadsheet: GoogleSpreadsheetWorksheet;

  headers = {
    date: 'Date',
    category: 'Category',
    expense: 'Expense',
    remarks: 'Remarks',
  };

  async initSpreadsheetDocument() {
    // spreadsheet key is the long id in the sheets URL
    this.document = new GoogleSpreadsheet(
      envService.getEnv('google-spread-id'),
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
    await this.document.useServiceAccountAuth({
      client_email: envService.getEnv('google-account-email'),
      private_key: envService.getEnv('google-private-key', true),
    });
  }
}

export const googleSpreadsheetService = new GoogleSpreadsheetService();
