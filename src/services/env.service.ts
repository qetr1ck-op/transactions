import { Injectable } from '@nestjs/common';

type GoogleSpreadSheetEnvs =
  | 'GOOGLE_SERVICE_ACCOUNT_EMAIL'
  | 'GOOGLE_PRIVATE_KEY'
  | 'GOOGLE_SPREADSHEET_ID';

@Injectable()
export class EnvService {
  getEnv(envKey: GoogleSpreadSheetEnvs): string {
    return process.env[envKey];
  }
}
