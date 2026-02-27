import type { ModuleRbacPolicy } from '@/core/auth/rbac-policy';
import { Role } from '@/core/auth/enums/roles.enum';

export const NOTIFICATIONS_RBAC_POLICY: ModuleRbacPolicy = {
  module: 'notifications',
  grants: [
    { role: Role.USER, action: 'read', resources: ['notifications'], possession: 'own' },
    { role: Role.STAFF, action: 'read', resources: ['notifications'] },
    { role: Role.STAFF, action: 'create', resources: ['notifications'] },
    { role: Role.STAFF, action: 'update', resources: ['notifications'] },
    { role: Role.STAFF, action: 'delete', resources: ['notifications'] }
  ]
};
