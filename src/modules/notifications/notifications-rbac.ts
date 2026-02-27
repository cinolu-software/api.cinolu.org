import { Role } from '@/core/auth/enums/roles.enum';
import { createRbac } from '@/core/auth/rbac/rbac.provider';

export const NOTIFICATIONS_RBAC = createRbac({
  module: 'notifications',
  grants: [
    { roles: [Role.USER, Role.MENTOR], actions: ['read'], resources: ['notifications'], possession: 'own' },
    { roles: [Role.STAFF], actions: ['read', 'create', 'update', 'delete'], resources: ['notifications'] }
  ]
});
