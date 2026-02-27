import { SetMetadata } from '@nestjs/common';
import { RoleRequirement } from '../rbac-policy';

export const ROLE_REQUIREMENTS_KEY = 'role_requirements';

export const Roles = (...requirements: RoleRequirement[]) => SetMetadata(ROLE_REQUIREMENTS_KEY, requirements);

export const Role = Roles;
