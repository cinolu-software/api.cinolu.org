import type { ModuleRbacPolicy } from '@/core/auth/rbac-policy';
import { Role } from '@/core/auth/enums/roles.enum';

export const EVENTS_RBAC_POLICY: ModuleRbacPolicy = {
  module: 'events',
  grants: [
    { role: Role.STAFF, action: 'read', resources: ['events', 'eventCategories'] },
    { role: Role.STAFF, action: 'create', resources: ['events', 'eventCategories'] },
    { role: Role.STAFF, action: 'update', resources: ['events', 'eventCategories'] },
    { role: Role.STAFF, action: 'delete', resources: ['events', 'eventCategories'] }
  ]
};
