import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './controllers/app.controller';
import { HealthCheckService } from './services/health-check.service';
import { EnvService } from './services/env.service';
import { GoogleSpreadsheetService } from './services/google-spreadsheet.service';
import { MonoTransactionService } from './services/mono-transaction.service';
import { TasksService } from './services/tasks.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [
    HealthCheckService,
    EnvService,
    GoogleSpreadsheetService,
    MonoTransactionService,
    TasksService,
  ],
})
export class AppModule {}
