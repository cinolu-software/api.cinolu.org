import { Role } from '@/core/auth/enums/roles.enum';
import { createRbac } from '@/core/auth/rbac/rbac.provider';

export const VENTURES_RBAC = createRbac({
  module: 'ventures',
  grants: [
    {
      roles: [Role.STAFF],
      actions: ['create', 'read', 'update', 'delete'],
      resources: ['ventures', 'products']
    },
    {
      roles: [Role.USER],
      actions: ['create', 'update'],
      resources: ['ventures', 'products'],
      possession: 'own'
    }
  ]
});
