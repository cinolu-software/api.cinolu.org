import { RolesEnum } from '../enums/roles.enum';

export interface IAuthorizedParams {
  currentRoles: RolesEnum[];
  requiredRole: RolesEnum;
}
