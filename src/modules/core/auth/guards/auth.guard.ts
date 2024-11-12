import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { IS_PUBLIC } from 'src/common/decorators/public.decorator';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic: boolean =
      this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [context.getHandler(), context.getClass()]) || false;
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest();
    const isAuth = request.isAuthenticated();
    if (isAuth) return true;
    throw new ForbiddenException('Veuillez vous connecter');
  }
}
