import { Role } from '@/core/auth/enums/roles.enum';
import { ModuleRbacPolicy } from 'nestjs-session-auth';

export const NOTIFICATIONS_RBAC_POLICY: ModuleRbacPolicy = {
  module: 'notifications',
  grants: [
    { roles: [Role.USER, Role.MENTOR], actions: ['read'], resources: ['notifications'], possession: 'own' },
    { roles: [Role.STAFF], actions: ['read', 'create', 'update', 'delete'], resources: ['notifications'] }
  ]
};
