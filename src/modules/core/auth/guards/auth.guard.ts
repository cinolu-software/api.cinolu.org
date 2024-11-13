import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { IS_PUBLIC } from 'src/modules/core/auth/decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const isPublic: boolean =
      this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [ctx.getHandler(), ctx.getClass()]) || false;
    if (isPublic) return true;
    const request = ctx.switchToHttp().getRequest();
    const isAuth = request.isAuthenticated();
    if (isAuth) return true;
    throw new ForbiddenException('Veuillez vous connecter');
  }
}
