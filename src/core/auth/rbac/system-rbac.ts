import { Role } from '../enums/roles.enum';
import { ModuleRbacPolicy } from './rbac-policy';

export const SYSTEM_RBAC_POLICY: ModuleRbacPolicy = {
  module: 'system',
  grants: [{ roles: [Role.ADMIN], actions: ['manage'], resources: ['*'] }]
};
