import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RolesEnum } from '../enums/roles.enum';
import { AccessControlService } from '../access-control.service';
import { REQUIRED_ROLES } from '../decorators/roles.decorators';

@Injectable()
export class AccessControlGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accessControlService: AccessControlService
  ) {}

  canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRole = this.reflector.getAllAndOverride<RolesEnum>(REQUIRED_ROLES, [
      ctx.getHandler(),
      ctx.getClass()
    ]);
    if (!requiredRole) return true;
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    return this.accessControlService.isAuthorized({ currentRoles: user?.roles, requiredRole });
  }
}
