import { Role } from '@/core/auth/enums/roles.enum';
import { ModuleRbacPolicy } from '@/core/auth/rbac/rbac-policy';

export const MENTORS_RBAC_POLICY: ModuleRbacPolicy = {
  module: 'mentors',
  grants: [
    { roles: [Role.USER, Role.MENTOR], actions: ['update', 'delete'], resources: ['mentors'], possession: 'own' },
    { roles: [Role.STAFF], actions: ['read', 'create', 'update', 'delete'], resources: ['mentors', 'expertises'] }
  ]
};
