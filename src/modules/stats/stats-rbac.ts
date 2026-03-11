import { Role } from '@/core/auth/enums/roles.enum';
import { ModuleRbacPolicy } from 'nestjs-session-auth';

export const STATS_RBAC_POLICY: ModuleRbacPolicy = {
  module: 'stats',
  grants: [{ roles: [Role.STAFF], actions: ['read'], resources: ['stats'] }]
};
