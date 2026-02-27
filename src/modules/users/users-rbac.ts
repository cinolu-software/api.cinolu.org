import { Role } from '@/core/auth/enums/roles.enum';
import { createRbac } from '@/core/auth/rbac/rbac.provider';

export const USERS_RBAC = createRbac({
  module: 'users',
  grants: [
    {
      roles: [Role.STAFF],
      actions: ['create', 'read'],
      resources: ['users', 'roles', 'exportUsersCSV']
    }
  ]
});
