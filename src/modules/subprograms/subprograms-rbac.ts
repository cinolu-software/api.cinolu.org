import { Role } from '@/core/auth/enums/roles.enum';
import { createRbac } from '@/core/auth/rbac/rbac.provider';

export const SUBPROGRAMS_RBAC = createRbac({
  module: 'subprograms',
  grants: [
    {
      roles: [Role.STAFF],
      actions: ['read', 'create', 'update'],
      resources: ['subprograms']
    }
  ]
});
