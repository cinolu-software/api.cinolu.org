import { Role } from '@/core/auth/enums/roles.enum';
import { createRbac } from '@/core/auth/rbac/rbac.provider';

export const MENTORS_RBAC = createRbac({
  module: 'mentors',
  grants: [
    { roles: [Role.USER, Role.MENTOR], actions: ['update', 'delete'], resources: ['mentors'], possession: 'own' },
    { roles: [Role.STAFF], actions: ['read', 'create', 'update', 'delete'], resources: ['mentors', 'expertises'] },
    { roles: [Role.STAFF], actions: ['update'], resources: ['mentorApplications'] }
  ]
});
