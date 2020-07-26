import { Injectable } from '@nestjs/common';

type GoogleSpreadSheetEnvs =
  | 'GOOGLE_SERVICE_ACCOUNT_EMAIL'
  | 'GOOGLE_PRIVATE_KEY'
  | 'GOOGLE_SPREADSHEET_ID';

@Injectable()
export class EnvService {
  getEnv(envKey: GoogleSpreadSheetEnvs, isMultiLine?: boolean): string {
    const envVar = process.env[envKey];

    if (!envVar) {
      console.error(`${envKey} is undefined`);
      return '';
    }

    if (isMultiLine) {
      return envVar.replace(/\\n/g, '\n');
    }

    return envVar;
  }
}
