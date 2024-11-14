import { RightsEnum } from '../enums/rights.enum';

export interface IAuthorizedParams {
  currentRoles: RightsEnum[];
  requiredRole: RightsEnum;
}
