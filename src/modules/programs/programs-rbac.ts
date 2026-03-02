import { Role } from '@/core/auth/enums/roles.enum';
import { ModuleRbacPolicy } from '@/core/auth/rbac/rbac-policy';

export const PROGRAMS_RBAC_POLICY: ModuleRbacPolicy = {
  module: 'programs',
  grants: [
    {
      roles: [Role.STAFF],
      actions: ['read', 'create', 'update', 'delete'],
      resources: ['programs', 'programCategories']
    }
  ]
};
