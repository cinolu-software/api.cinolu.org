import { Role } from '@/core/auth/enums/roles.enum';
import { createRbac } from '@/core/auth/rbac/rbac.provider';

export const PROGRAMS_RBAC = createRbac({
  module: 'programs',
  grants: [
    {
      roles: [Role.STAFF],
      actions: ['read', 'create', 'update', 'delete'],
      resources: ['programs', 'programCategories']
    }
  ]
});
