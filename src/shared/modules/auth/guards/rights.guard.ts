import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { RIGHTS_POLICY } from '../decorators/rights.decorators';
import { RightsEnum } from '../enums/rights.enum';
import { RightsService } from '../rights.service';

@Injectable()
export class RightsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private rightsService: RightsService
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const requiredRole = this.reflector.getAllAndOverride<RightsEnum>(RIGHTS_POLICY, [
      ctx.getHandler(),
      ctx.getClass()
    ]);
    if (!requiredRole) return true;
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    try {
      this.rightsService.isAuthorized({ currentRoles: user?.roles, requiredRole });
      return true;
    } catch {
      throw new UnauthorizedException("Vous n'avez juste pas le droit !");
    }
  }
}
