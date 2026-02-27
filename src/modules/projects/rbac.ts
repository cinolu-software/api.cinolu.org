import type { ModuleRbacPolicy } from '@/core/auth/rbac-policy';
import { Role } from '@/core/auth/enums/roles.enum';

export const PROJECTS_RBAC_POLICY: ModuleRbacPolicy = {
  module: 'projects',
  grants: [
    { role: Role.STAFF, action: 'read', resources: ['projects', 'projectCategories', 'phases'] },
    { role: Role.STAFF, action: 'create', resources: ['projects', 'projectCategories', 'phases', 'indicators'] },
    { role: Role.STAFF, action: 'update', resources: ['projects', 'projectCategories', 'phases', 'indicators'] },
    { role: Role.STAFF, action: 'delete', resources: ['projects', 'projectCategories', 'phases', 'indicators'] }
  ]
};
