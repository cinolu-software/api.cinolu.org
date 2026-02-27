import { Role } from './enums/roles.enum';
import { BLOG_RBAC_POLICY } from '@/modules/blog/rbac';
import { EVENTS_RBAC_POLICY } from '@/modules/events/rbac';
import { GALLERIES_RBAC_POLICY } from '@/modules/galleries/rbac';
import { HIGHLIGHTS_RBAC_POLICY } from '@/modules/highlights/rbac';
import { MENTORS_RBAC_POLICY } from '@/modules/mentors/rbac';
import { NOTIFICATIONS_RBAC_POLICY } from '@/modules/notifications/rbac';
import { PROGRAMS_RBAC_POLICY } from '@/modules/programs/rbac';
import { PROJECTS_RBAC_POLICY } from '@/modules/projects/rbac';
import { STATS_RBAC_POLICY } from '@/modules/stats/rbac';
import { SUBPROGRAMS_RBAC_POLICY } from '@/modules/subprograms/rbac';
import { USERS_RBAC_POLICY } from '@/modules/users/rbac';
import { VENTURES_RBAC_POLICY } from '@/modules/ventures/rbac';

export type RbacAction = 'create' | 'read' | 'update' | 'delete';
export type RbacPossession = 'own' | 'any';

export interface RoleRequirement {
  resource: string;
  action: RbacAction;
  possession?: RbacPossession;
}

export interface RbacGrant {
  role: Role;
  action: RbacAction;
  resources: string[];
  possession?: RbacPossession;
}

export interface ModuleRbacPolicy {
  module: string;
  grants: RbacGrant[];
}

type PermissionSet = {
  any: Set<string>;
  own: Set<string>;
};

type RolePolicy = Record<RbacAction, PermissionSet>;

const createEmptyPolicy = (): RolePolicy => ({
  create: { any: new Set<string>(), own: new Set<string>() },
  read: { any: new Set<string>(), own: new Set<string>() },
  update: { any: new Set<string>(), own: new Set<string>() },
  delete: { any: new Set<string>(), own: new Set<string>() }
});

export const MODULE_RBAC_POLICIES: ModuleRbacPolicy[] = [
  BLOG_RBAC_POLICY,
  EVENTS_RBAC_POLICY,
  GALLERIES_RBAC_POLICY,
  HIGHLIGHTS_RBAC_POLICY,
  MENTORS_RBAC_POLICY,
  NOTIFICATIONS_RBAC_POLICY,
  PROGRAMS_RBAC_POLICY,
  PROJECTS_RBAC_POLICY,
  STATS_RBAC_POLICY,
  SUBPROGRAMS_RBAC_POLICY,
  USERS_RBAC_POLICY,
  VENTURES_RBAC_POLICY
];

const ROLE_EXTENDS: Record<Role, Role[]> = {
  [Role.USER]: [],
  [Role.MENTOR]: [Role.USER],
  [Role.STAFF]: [],
  [Role.ADMIN]: [Role.STAFF]
};

const ROLE_POLICIES: Record<Role, RolePolicy> = {
  [Role.USER]: createEmptyPolicy(),
  [Role.MENTOR]: createEmptyPolicy(),
  [Role.STAFF]: createEmptyPolicy(),
  [Role.ADMIN]: createEmptyPolicy()
};

for (const modulePolicy of MODULE_RBAC_POLICIES) {
  for (const grant of modulePolicy.grants) {
    const possession = grant.possession ?? 'any';
    const rolePolicy = ROLE_POLICIES[grant.role];
    for (const resource of grant.resources) {
      rolePolicy[grant.action][possession].add(resource);
    }
  }
}

const toRole = (role: string): Role | null => {
  if (Object.values(Role).includes(role as Role)) return role as Role;
  return null;
};

const resolveRoles = (roles: string[]): Set<Role> => {
  const resolved = new Set<Role>();
  const visit = (role: Role): void => {
    if (resolved.has(role)) return;
    resolved.add(role);
    for (const parent of ROLE_EXTENDS[role]) visit(parent);
  };
  for (const roleName of roles) {
    const role = toRole(roleName);
    if (role) visit(role);
  }
  return resolved;
};

const hasPermission = (policy: RolePolicy, requirement: RoleRequirement): boolean => {
  const possession = requirement.possession ?? 'any';
  const resource = requirement.resource;
  const grants = policy[requirement.action];
  if (grants.any.has(resource)) return true;
  if (possession === 'own' && grants.own.has(resource)) return true;
  return false;
};

export const canAccessAllRequirements = (roles: string[], requirements: RoleRequirement[]): boolean => {
  if (!requirements.length) return true;
  const effectiveRoles = resolveRoles(roles);
  if (!effectiveRoles.size) return false;
  return requirements.every((requirement) => {
    for (const role of effectiveRoles) {
      if (hasPermission(ROLE_POLICIES[role], requirement)) return true;
    }
    return false;
  });
};
