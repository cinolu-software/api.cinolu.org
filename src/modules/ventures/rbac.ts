import type { ModuleRbacPolicy } from '@/core/auth/rbac-policy';
import { Role } from '@/core/auth/enums/roles.enum';

export const VENTURES_RBAC_POLICY: ModuleRbacPolicy = {
  module: 'ventures',
  grants: [
    { role: Role.USER, action: 'read', resources: ['ventures', 'products'], possession: 'own' },
    { role: Role.USER, action: 'read', resources: ['opportunities'] },
    {
      role: Role.USER,
      action: 'update',
      resources: ['ventures', 'products', 'addCV'],
      possession: 'own'
    },
    { role: Role.USER, action: 'delete', resources: ['ventures', 'products'], possession: 'own' },
    { role: Role.STAFF, action: 'read', resources: ['ventures', 'opportunities'] },
    { role: Role.STAFF, action: 'create', resources: ['opportunities'] },
    { role: Role.STAFF, action: 'update', resources: ['ventures', 'publishVenture', 'opportunities'] },
    { role: Role.STAFF, action: 'delete', resources: ['ventures', 'opportunities'] }
  ]
};
