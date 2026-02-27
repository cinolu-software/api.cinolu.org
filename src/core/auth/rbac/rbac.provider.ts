import { Provider } from '@nestjs/common';
import { ModuleRbacPolicy } from './rbac-policy';
import { RbacService } from './rbac.service';

export const createRbac = (policy: ModuleRbacPolicy): Provider => ({
  provide: `RBAC_POLICY_REGISTRATION:${policy.module}`,
  inject: [RbacService],
  useFactory: (registry: RbacService): boolean => {
    registry.register(policy);
    return true;
  }
});
