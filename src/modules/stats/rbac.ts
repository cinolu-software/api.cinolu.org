import type { ModuleRbacPolicy } from '@/core/auth/rbac-policy';
import { Role } from '@/core/auth/enums/roles.enum';

export const STATS_RBAC_POLICY: ModuleRbacPolicy = {
  module: 'stats',
  grants: [{ role: Role.STAFF, action: 'read', resources: ['stats'] }]
};
