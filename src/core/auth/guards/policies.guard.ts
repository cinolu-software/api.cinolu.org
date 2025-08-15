import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppAbility, CaslAbilityFactory } from '../../casl/casl-ability.factory';
import { PolicyHandler } from '../../casl/policies.interface';
import { CHECK_POLICIES_KEY } from '../../../shared/decorators/check-policy.decorator';
import { IS_PUBLIC_KEY } from '../../../shared/decorators/public.decorator';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.getAllAndOverride<PolicyHandler[]>(CHECK_POLICIES_KEY, [ctx.getHandler(), ctx.getClass()]) || [];
    const isPublic =
      this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [ctx.getHandler(), ctx.getClass()]) || false;
    if (isPublic) return true;
    const req = ctx.switchToHttp().getRequest();
    const isAuth = req.isAuthenticated();
    if (!isAuth) return false;
    const ability = this.caslAbilityFactory.createForUser(req.user);
    return policyHandlers.every((handler) => this.execPolicyHandler(handler, ability as AppAbility));
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
