import { SetMetadata } from '@nestjs/common';

export const RIGHTS_POLICY = 'required_roles';
export const Authorization = (role: string) => SetMetadata(RIGHTS_POLICY, role);
