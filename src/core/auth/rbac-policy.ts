import { RolesBuilder } from 'nest-access-control';
import { Role } from './enums/roles.enum';

export const RBAC_POLICY: RolesBuilder = new RolesBuilder();

RBAC_POLICY.grant(Role.USER)
  .updateOwn(['ventures', 'comments'])
  .deleteOwn(['ventures', 'comments'])
  .grant(Role.STAFF)
  .readAny([
    'users',
    'programs',
    'subprograms',
    'roles',
    'comments',
    'events',
    'eventCategories',
    'projects',
    'projectCategories',
    'blogs',
    'ventures',
    'tags',
    'exportUsersCSV'
  ])
  .createAny([
    'users',
    'programs',
    'comments',
    'events',
    'roles',
    'tags',
    'subprograms',
    'eventCategories',
    'projectCategories',
    'projects',
    'blogs'
  ])
  .updateAny([
    'users',
    'programs',
    'subprograms',
    'events',
    'comments',
    'eventCategories',
    'projectCategories',
    'projects',
    'roles',
    'blogs',
    'tags',
    'ventures',
    'publishVenture'
  ])
  .deleteAny([
    'users',
    'programs',
    'subprograms',
    'events',
    'roles',
    'comments',
    'tags',
    'eventCategories',
    'projectCategories',
    'projects',
    'blogs',
    'ventures'
  ])
  .grant(Role.ADMIN)
  .extend(Role.STAFF);
