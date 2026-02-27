import type { ModuleRbacPolicy } from '@/core/auth/rbac-policy';
import { Role } from '@/core/auth/enums/roles.enum';

export const PROGRAMS_RBAC_POLICY: ModuleRbacPolicy = {
  module: 'programs',
  grants: [
    { role: Role.STAFF, action: 'read', resources: ['programs', 'programCategories'] },
    { role: Role.STAFF, action: 'create', resources: ['programs', 'programCategories'] },
    { role: Role.STAFF, action: 'update', resources: ['programs', 'programCategories'] },
    { role: Role.STAFF, action: 'delete', resources: ['programs', 'programCategories'] }
  ]
};
