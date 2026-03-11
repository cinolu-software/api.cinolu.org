/**
 * Re-exports RBAC types from nestjs-session-auth for backward compatibility.
 * @deprecated Import directly from 'nestjs-session-auth'
 */
export {
  RbacAction,
  RbacPossession,
  RoleRequirement,
  RbacGrant,
  ModuleRbacPolicy,
  canAccessAllRequirements,
} from 'nestjs-session-auth';
