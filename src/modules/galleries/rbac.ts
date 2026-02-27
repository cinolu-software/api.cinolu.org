import type { ModuleRbacPolicy } from '@/core/auth/rbac-policy';
import { Role } from '@/core/auth/enums/roles.enum';

export const GALLERIES_RBAC_POLICY: ModuleRbacPolicy = {
  module: 'galleries',
  grants: [{ role: Role.STAFF, action: 'delete', resources: ['galleries'] }]
};
