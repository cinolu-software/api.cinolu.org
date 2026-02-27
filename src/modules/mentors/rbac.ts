import type { ModuleRbacPolicy } from '@/core/auth/rbac-policy';
import { Role } from '@/core/auth/enums/roles.enum';

export const MENTORS_RBAC_POLICY: ModuleRbacPolicy = {
  module: 'mentors',
  grants: [
    { role: Role.USER, action: 'update', resources: ['mentors'], possession: 'own' },
    { role: Role.USER, action: 'delete', resources: ['mentors'], possession: 'own' },
    { role: Role.STAFF, action: 'read', resources: ['mentors', 'expertises'] },
    { role: Role.STAFF, action: 'create', resources: ['mentors', 'expertises'] },
    { role: Role.STAFF, action: 'update', resources: ['mentors', 'expertises', 'mentorApplications'] },
    { role: Role.STAFF, action: 'delete', resources: ['mentors', 'expertises'] }
  ]
};
