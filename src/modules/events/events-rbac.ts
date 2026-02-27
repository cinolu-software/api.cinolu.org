import { Role } from '@/core/auth/enums/roles.enum';
import { createRbac } from '@/core/auth/rbac/rbac.provider';

export const EVENTS_RBAC = createRbac({
  module: 'events',
  grants: [
    { roles: [Role.STAFF], actions: ['read', 'create', 'update', 'delete'], resources: ['events', 'eventCategories'] }
  ]
});
