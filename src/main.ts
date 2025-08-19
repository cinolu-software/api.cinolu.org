import { NestFactory } from '@nestjs/core';
import * as passport from 'passport';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const port = Number(process.env.PORT) as number;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  );
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
  });
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: Boolean(process.env.SESSION_RESAVE),
      saveUninitialized: Boolean(process.env.SESSION_SAVE_UNINITIALIZED),
      cookie: { maxAge: 86400000, secure: false, sameSite: 'strict', httpOnly: true }
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  const config = new DocumentBuilder().setTitle('API DOCS').build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  // await SwaggerModule.loadPluginMetadata(metadata);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(port);
}
bootstrap().then();
