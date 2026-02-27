import { Role } from '@/core/auth/enums/roles.enum';
import { createRbac } from '@/core/auth/rbac/rbac.provider';

export const STATS_RBAC = createRbac({
  module: 'stats',
  grants: [{ roles: [Role.STAFF], actions: ['read'], resources: ['stats'] }]
});
