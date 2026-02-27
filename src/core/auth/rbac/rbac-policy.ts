import { Role } from '../enums/roles.enum';

export type RbacAction = 'create' | 'read' | 'update' | 'delete' | 'manage';
export type RbacPossession = 'own' | 'any';

export interface RoleRequirement {
  resource: string;
  action: RbacAction;
  possession?: RbacPossession;
}

export interface RbacGrant {
  roles: Role[];
  actions?: RbacAction[];
  action?: RbacAction;
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
  delete: { any: new Set<string>(), own: new Set<string>() },
  manage: { any: new Set<string>(), own: new Set<string>() }
});

const createRolePolicyMap = (modulePolicies: ModuleRbacPolicy[]): Record<Role, RolePolicy> => {
  const rolePolicies: Record<Role, RolePolicy> = {
    [Role.USER]: createEmptyPolicy(),
    [Role.MENTOR]: createEmptyPolicy(),
    [Role.STAFF]: createEmptyPolicy(),
    [Role.ADMIN]: createEmptyPolicy()
  };
  for (const modulePolicy of modulePolicies) {
    for (const grant of modulePolicy.grants) {
      const possession = grant.possession ?? 'any';
      const actions = grant.actions?.length ? grant.actions : grant.action ? [grant.action] : [];
      if (!actions.length) continue;
      for (const role of grant.roles) {
        const rolePolicy = rolePolicies[role];
        for (const action of actions) {
          for (const resource of grant.resources) {
            rolePolicy[action][possession].add(resource);
          }
        }
      }
    }
  }
  return rolePolicies;
};

const toRole = (role: string): Role | null => {
  if (Object.values(Role).includes(role as Role)) return role as Role;
  return null;
};

const hasPermission = (policy: RolePolicy, requirement: RoleRequirement): boolean => {
  const possession = requirement.possession ?? 'any';
  const resource = requirement.resource;
  const manageGrants = policy.manage;
  const grants = policy[requirement.action];
  if (manageGrants.any.has('*') || manageGrants.any.has(resource)) return true;
  if (grants.any.has(resource)) return true;
  if (possession === 'own' && grants.own.has(resource)) return true;
  return false;
};

export const canAccessAllRequirements = (
  roles: string[],
  requirements: RoleRequirement[],
  modulePolicies: ModuleRbacPolicy[]
): boolean => {
  if (!requirements.length) return true;
  const effectiveRoles = new Set<Role>(roles.map(toRole).filter((role): role is Role => role !== null));
  if (!effectiveRoles.size) return false;
  const rolePolicies = createRolePolicyMap(modulePolicies);
  return requirements.every((requirement) => {
    for (const role of effectiveRoles) {
      if (hasPermission(rolePolicies[role], requirement)) return true;
    }
    return false;
  });
};
