import { Role } from '../enums/roles.enum';
import { createRbac } from './rbac.provider';

export const SYSTEM_RBAC_REGISTRATION = createRbac({
  module: 'system',
  grants: [{ roles: [Role.ADMIN], actions: ['manage'], resources: ['*'] }]
});
