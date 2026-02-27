import { SetMetadata } from '@nestjs/common';
import { RoleRequirement } from '../rbac/rbac-policy';

export const ROLE_REQUIREMENTS_KEY = 'role_requirements';

export const Rbac = (...requirements: RoleRequirement[]) => SetMetadata(ROLE_REQUIREMENTS_KEY, requirements);
