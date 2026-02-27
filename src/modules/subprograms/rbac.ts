import type { ModuleRbacPolicy } from '@/core/auth/rbac-policy';
import { Role } from '@/core/auth/enums/roles.enum';

export const SUBPROGRAMS_RBAC_POLICY: ModuleRbacPolicy = {
  module: 'subprograms',
  grants: [
    { role: Role.STAFF, action: 'read', resources: ['subprograms'] },
    { role: Role.STAFF, action: 'create', resources: ['subprograms'] },
    { role: Role.STAFF, action: 'update', resources: ['subprograms'] },
    { role: Role.STAFF, action: 'delete', resources: ['subprograms'] }
  ]
};
