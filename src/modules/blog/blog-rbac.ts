import { Role } from '@/core/auth/enums/roles.enum';
import { createRbac } from '@/core/auth/rbac/rbac.provider';

export const BLOG_RBAC = createRbac({
  module: 'blog',
  grants: [
    { roles: [Role.USER, Role.MENTOR], actions: ['update', 'delete'], resources: ['comments'], possession: 'own' },
    { roles: [Role.STAFF], actions: ['read', 'create', 'update', 'delete'], resources: ['blogs', 'tags', 'comments'] }
  ]
});
