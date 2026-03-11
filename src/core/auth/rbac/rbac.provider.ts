import { Provider } from '@nestjs/common';
import { ModuleRbacPolicy, RbacRegistryService } from 'nestjs-session-auth';

/** @deprecated Use SessionAuthModule.forFeature() directly */
export const createRbac = (policy: ModuleRbacPolicy): Provider => ({
  provide: `RBAC_POLICY_REGISTRATION:${policy.module}`,
  inject: [RbacRegistryService],
  useFactory: (registry: RbacRegistryService): boolean => {
    registry.register(policy);
    return true;
  },
});

/** @deprecated Use SessionAuthModule.forFeature() directly */
export const createRbacProviders = (policies: ModuleRbacPolicy[]): Provider[] =>
  policies.map(createRbac);
