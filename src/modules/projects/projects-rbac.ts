import { Role } from '@/core/auth/enums/roles.enum';
import { createRbac } from '@/core/auth/rbac/rbac.provider';

export const PROJECTS_RBAC = createRbac({
  module: 'projects',
  grants: [
    {
      roles: [Role.STAFF],
      actions: ['read', 'create', 'update', 'delete'],
      resources: ['projects', 'projectCategories', 'phases', 'indicators']
    }
  ]
});
