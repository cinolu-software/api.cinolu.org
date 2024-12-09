import { RoleEnum } from '../../shared/enums/roles.enum';

export interface IAuthorizedParams {
  currentRoles: RoleEnum[];
  requiredRole: RoleEnum;
}
