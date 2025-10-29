import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApp } from './common/config/app.config';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

/**
 * Bootstrap the application
 */
async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose']
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  const nodeEnv = configService.get<string>('NODE_ENV', 'development');
  setupApp(app);
  await app.listen(port);
  logger.log(`🚀 Application is running on: http://localhost:${port}`);
  logger.log(`🌍 Environment: ${nodeEnv}`);
}

bootstrap();
