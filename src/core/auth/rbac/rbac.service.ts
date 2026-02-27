import { Injectable } from '@nestjs/common';
import { ModuleRbacPolicy } from './rbac-policy';

@Injectable()
export class RbacService {
  private readonly modulePolicies = new Map<string, ModuleRbacPolicy>();

  register(policy: ModuleRbacPolicy): void {
    this.modulePolicies.set(policy.module, policy);
  }

  getPolicies(): ModuleRbacPolicy[] {
    return Array.from(this.modulePolicies.values());
  }
}
