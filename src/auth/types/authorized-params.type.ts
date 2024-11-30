import { RightsEnum } from '../../shared/enums/rights.enum';

export interface IAuthorizedParams {
  currentRoles: RightsEnum[];
  requiredRole: RightsEnum;
}
