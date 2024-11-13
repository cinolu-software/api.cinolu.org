import { Injectable } from '@nestjs/common';
import { RolesEnum } from './enums/roles.enum';

interface IsAuthorizedParams {
  currentRoles: RolesEnum[];
  requiredRole: RolesEnum;
}

@Injectable()
export class AccessControlService {
  private hierarchies: { role: string; priority: number }[] = [];
  private priority: number = 1;

  constructor() {
    this.buildRoles([RolesEnum.Guest, RolesEnum.User, RolesEnum.Coach, RolesEnum.Staff, RolesEnum.Admin]);
  }

  private buildRoles(roles: RolesEnum[]): void {
    this.hierarchies = roles.map((role) => {
      const priority = this.priority++;
      return { role, priority };
    });
  }

  private getPriority(role: RolesEnum): number {
    const hierarchy = this.hierarchies.find((h) => h.role === role);
    return hierarchy ? hierarchy.priority : -1;
  }

  public isAuthorized({ currentRoles, requiredRole }: IsAuthorizedParams): boolean {
    const requiredPriority = this.getPriority(requiredRole);
    const currentPriorities = currentRoles?.map((role) => this.getPriority(role)) ?? [1];
    const currentHighPriority = Math.max(...currentPriorities);
    return currentHighPriority >= requiredPriority;
  }
}
