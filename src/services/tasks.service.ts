import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron('0 9-22 * * *') // At minute 0 past every hour from 9 through 22.
  handleCron() {
    this.logger.debug('Wake up');
  }
}
