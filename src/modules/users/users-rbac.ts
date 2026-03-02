import { Role } from '@/core/auth/enums/roles.enum';
import { ModuleRbacPolicy } from '@/core/auth/rbac/rbac-policy';

export const USERS_RBAC_POLICY: ModuleRbacPolicy = {
  module: 'users',
  grants: [
    {
      roles: [Role.STAFF],
      actions: ['create', 'read', 'update', 'delete'],
      resources: ['users', 'roles', 'exportUsersCSV']
    }
  ]
};
