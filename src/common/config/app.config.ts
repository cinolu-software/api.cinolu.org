import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';

export function setupApp(app: INestApplication): void {
  const configService = app.get(ConfigService);
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
}
