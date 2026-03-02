import { Role } from '@/core/auth/enums/roles.enum';
import { ModuleRbacPolicy } from '@/core/auth/rbac/rbac-policy';

export const PROJECTS_RBAC_POLICY: ModuleRbacPolicy = {
  module: 'projects',
  grants: [
    {
      roles: [Role.STAFF],
      actions: ['read', 'create', 'update', 'delete'],
      resources: ['projects', 'projectCategories', 'phases', 'indicators']
    }
  ]
};
