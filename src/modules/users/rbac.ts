import type { ModuleRbacPolicy } from '@/core/auth/rbac-policy';
import { Role } from '@/core/auth/enums/roles.enum';

export const USERS_RBAC_POLICY: ModuleRbacPolicy = {
  module: 'users',
  grants: [
    { role: Role.STAFF, action: 'read', resources: ['users', 'roles', 'exportUsersCSV'] },
    { role: Role.STAFF, action: 'create', resources: ['users', 'roles'] },
    { role: Role.STAFF, action: 'update', resources: ['users', 'roles'] },
    { role: Role.STAFF, action: 'delete', resources: ['users', 'roles'] }
  ]
};
