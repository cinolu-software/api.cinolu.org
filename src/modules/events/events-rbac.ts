import { Role } from '@/core/auth/enums/roles.enum';
import { ModuleRbacPolicy } from 'nestjs-session-auth';

export const EVENTS_RBAC_POLICY: ModuleRbacPolicy = {
  module: 'events',
  grants: [
    { roles: [Role.STAFF], actions: ['read', 'create', 'update', 'delete'], resources: ['events', 'eventCategories'] }
  ]
};
