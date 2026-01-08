import { RolesBuilder } from 'nest-access-control';
import { Role } from './enums/roles.enum';

export const RBAC_POLICY: RolesBuilder = new RolesBuilder();

RBAC_POLICY.grant(Role.USER)
  .readOwn(['products', 'ventures'])
  .updateOwn(['ventures', 'comments', 'products', 'mentorsProfiles', 'addCV'])
  .deleteOwn(['ventures', 'comments', 'products', 'mentorsProfiles'])
  .grant(Role.MENTOR)
  .extend(Role.USER)
  .grant(Role.STAFF)
  .readAny([
    'stats',
    'users',
    'programs',
    'mentorsProfiles',
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
    'expertises',
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
    'publishVenture',
    'mentorApplications',
    'expertises'
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
    'galleries',
    'mentorsProfiles',
    'expertises'
  ])
  .grant(Role.ADMIN)
  .extend(Role.STAFF);
