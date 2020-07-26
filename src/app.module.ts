import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { HealthCheckService } from './services/health-check.service';
import { EnvService } from './services/env.service';
import { GoogleSpreadsheetService } from './services/google-spreadsheet.service';
import { MonoTransactionService } from './services/mono-transaction.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    HealthCheckService,
    EnvService,
    GoogleSpreadsheetService,
    MonoTransactionService,
  ],
})
export class AppModule {}
