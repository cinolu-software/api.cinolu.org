import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT) as number;
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  });
  app.use(
    session({
      secret: process.env.SESSION_SECRET as string,
      resave: Boolean(process.env.SESSION_RESAVE),
      saveUninitialized: Boolean(process.env.SESSION_SAVE_UNINITIALIZED),
      cookie: { maxAge: 86400000, secure: false, sameSite: 'strict', httpOnly: true }
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  const config = new DocumentBuilder().setTitle('API DOCS').build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  await app.listen(port);
}
bootstrap();
