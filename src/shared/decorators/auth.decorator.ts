import { SetMetadata } from '@nestjs/common';

export const RIGHTS_POLICY = 'required_roles';
export const Auth = (role: string) => SetMetadata(RIGHTS_POLICY, role);
