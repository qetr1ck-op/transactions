import * as functions from 'firebase-functions';

type GoogleSpreadSheetEnvs =
  | 'google-account-email'
  | 'google-spread-id'
  | 'google-private-key';

class EnvService {
  private serviceName = 'transactions';

  getEnv(envKey: GoogleSpreadSheetEnvs, isMultiLine?: boolean): string {
    const envVar = functions.config()[this.serviceName][envKey];

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

export const envService = new EnvService();
