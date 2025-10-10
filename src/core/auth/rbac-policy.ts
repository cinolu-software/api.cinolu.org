import { RolesBuilder } from 'nest-access-control';
import { Role } from './enums/roles.enum';

export const RBAC_POLICY: RolesBuilder = new RolesBuilder();

RBAC_POLICY.grant(Role.USER)
  .readOwn(['products', 'ventures'])
  .updateOwn(['ventures', 'comments', 'products'])
  .deleteOwn(['ventures', 'comments', 'products'])
  .grant(Role.STAFF)
  .readAny([
    'stats',
    'users',
    'programs',
    'subprograms',
    'roles',
    'comments',
    'events',
    'eventCategories',
    'programCategories',
    'projects',
    'projectCategories',
    'blogs',
    'ventures',
    'tags',
    'exportUsersCSV'
  ])
  .createAny([
    'indicators',
    'users',
    'programs',
    'comments',
    'events',
    'roles',
    'tags',
    'subprograms',
    'eventCategories',
    'programCategories',
    'projectCategories',
    'projects',
    'blogs'
  ])
  .updateAny([
    'indicators',
    'users',
    'programs',
    'subprograms',
    'events',
    'comments',
    'eventCategories',
    'programCategories',
    'projectCategories',
    'projects',
    'roles',
    'blogs',
    'tags',
    'ventures',
    'publishVenture'
  ])
  .deleteAny([
    'indicators',
    'users',
    'programs',
    'subprograms',
    'events',
    'roles',
    'comments',
    'tags',
    'eventCategories',
    'programCategories',
    'projectCategories',
    'projects',
    'blogs',
    'ventures',
    'galleries'
  ])
  .grant(Role.ADMIN)
  .extend(Role.STAFF);
