import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  );
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
  });
  app.use(
    session({
      secret: configService.get('SESSION_SECRET') as string,
      resave: configService.get('SESSION_RESAVE') === 'true',
      saveUninitialized: configService.get('SESSION_SAVE_UNINITIALIZED') === 'true',
      cookie: { maxAge: 86400000, secure: false, sameSite: 'strict', httpOnly: true }
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(port);
}

bootstrap();
