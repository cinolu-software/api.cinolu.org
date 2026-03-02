import { Role } from '@/core/auth/enums/roles.enum';
import { ModuleRbacPolicy } from '@/core/auth/rbac/rbac-policy';

export const SUBPROGRAMS_RBAC_POLICY: ModuleRbacPolicy = {
  module: 'subprograms',
  grants: [
    {
      roles: [Role.STAFF],
      actions: ['read', 'create', 'update', 'delete'],
      resources: ['subprograms']
    }
  ]
};
