import { SetMetadata } from '@nestjs/common';

export const REQUIRED_ROLES = 'required_roles';
export const Roles = (role: string) => SetMetadata(REQUIRED_ROLES, role);
