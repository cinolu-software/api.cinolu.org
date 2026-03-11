import { Role } from '@/core/auth/enums/roles.enum';
import { ModuleRbacPolicy } from 'nestjs-session-auth';

export const SUBPROGRAMS_RBAC_POLICY: ModuleRbacPolicy = {
  module: 'subprograms',
  grants: [
    {
      roles: [Role.STAFF],
      actions: ['read', 'create', 'update', 'delete'],
      resources: ['subprograms']
    }
  ]
};
