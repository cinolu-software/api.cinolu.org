import { IoAdapter } from '@nestjs/platform-socket.io';
import * as session from 'express-session';
import * as passport from 'passport';
import { SessionOptions } from 'express-session';
import { INestApplication } from '@nestjs/common';
import { Server, ServerOptions, Socket } from 'socket.io';
import { NextFunction, Request, Response } from 'express';

export class SessionIoAdapter extends IoAdapter {
  private sessionMiddleware: ReturnType<typeof session>;

  constructor(sessionOptions: SessionOptions, app: INestApplication) {
    super(app);
    this.sessionMiddleware = session(sessionOptions);
  }

  create(port: number, options?: ServerOptions): Server {
    const server: Server = super.create(port, {
      ...options,
      cors: {
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        credentials: true
      }
    });
    server.use((socket: Socket, next: NextFunction) => {
      this.sessionMiddleware(socket.request as Request, {} as Response, next);
    });
    server.use((socket: Socket, next: NextFunction) => {
      passport.initialize()(socket.request as Request, {} as Response, next);
    });
    server.use((socket: Socket, next: NextFunction) => {
      passport.session()(socket.request, {} as Response, next);
    });
    return server;
  }
}
