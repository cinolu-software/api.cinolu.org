import { Injectable } from '@nestjs/common';
import { RolesEnum } from './enums/roles.enum';
import { Ihierarchy } from './types/hierarchy.type';
import { IAuthorizedParams } from './types/authorized-params.type';

@Injectable()
export class AccessControlService {
  #hierarchies: Ihierarchy[] = [];

  constructor() {
    this.buildRoles([RolesEnum.Guest, RolesEnum.User, RolesEnum.Coach, RolesEnum.Staff, RolesEnum.Admin]);
  }

  private buildRoles(roles: RolesEnum[]): void {
    this.#hierarchies = roles.map((role, i) => {
      const priority = ++i;
      return { role, priority };
    });
  }

  private getPriority(role: RolesEnum): number {
    const hierarchy = this.#hierarchies.find((h) => h.role === role);
    return hierarchy ? hierarchy.priority : -1;
  }

  public isAuthorized({ currentRoles, requiredRole }: IAuthorizedParams): boolean {
    const requiredPriority = this.getPriority(requiredRole);
    if (requiredPriority === 1) return true;
    const currentPriorities = currentRoles?.map((role) => this.getPriority(role));
    const currentHighPriority = currentPriorities ? Math.max(...currentPriorities) : 1;
    return currentHighPriority >= requiredPriority;
  }
}
