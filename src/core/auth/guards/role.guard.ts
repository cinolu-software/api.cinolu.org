import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_REQUIREMENTS_KEY } from '../decorators/role.decorator';
import { canAccessAllRequirements, RoleRequirement } from '../rbac-policy';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requirements = this.reflector.getAllAndOverride<RoleRequirement[]>(ROLE_REQUIREMENTS_KEY, [
      ctx.getHandler(),
      ctx.getClass()
    ]);
    if (!requirements?.length) return true;
    const req = ctx.switchToHttp().getRequest();
    const userRoles = Array.isArray(req?.user?.roles)
      ? req.user.roles
          .map((role: string | { name?: string }) => (typeof role === 'string' ? role : role?.name))
          .filter(Boolean)
      : [];
    return canAccessAllRequirements(userRoles, requirements);
  }
}
