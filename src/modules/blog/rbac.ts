import type { ModuleRbacPolicy } from '@/core/auth/rbac-policy';
import { Role } from '@/core/auth/enums/roles.enum';

export const BLOG_RBAC_POLICY: ModuleRbacPolicy = {
  module: 'blog',
  grants: [
    { role: Role.USER, action: 'update', resources: ['comments'], possession: 'own' },
    { role: Role.USER, action: 'delete', resources: ['comments'], possession: 'own' },
    { role: Role.STAFF, action: 'read', resources: ['blogs', 'tags', 'comments'] },
    { role: Role.STAFF, action: 'create', resources: ['blogs', 'tags', 'comments'] },
    { role: Role.STAFF, action: 'update', resources: ['blogs', 'tags', 'comments'] },
    { role: Role.STAFF, action: 'delete', resources: ['blogs', 'tags', 'comments'] }
  ]
};
