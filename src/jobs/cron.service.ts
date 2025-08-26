import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronService implements OnModuleInit {
  private readonly logger = new Logger(CronService.name);

  onModuleInit() {
    this.logger.log('Cron service wired ✅');
  }

  @Cron(CronExpression.EVERY_MINUTE)
  handleEveryMinute() {
    this.logger.log(`cron job 실행됨: ${new Date().toISOString()}`);
  }
}
