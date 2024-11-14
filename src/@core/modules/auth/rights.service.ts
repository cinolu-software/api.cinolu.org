import { Injectable } from '@nestjs/common';
import { RightsEnum } from './enums/rights.enum';
import { Ihierarchy } from './types/hierarchy.type';
import { IAuthorizedParams } from './types/authorized-params.type';

@Injectable()
export class RightsService {
  #hierarchies: Ihierarchy[] = [];

  constructor() {
    this.buildRoles([RightsEnum.Guest, RightsEnum.User, RightsEnum.Coach, RightsEnum.Staff, RightsEnum.Admin]);
  }

  private buildRoles(roles: RightsEnum[]): void {
    this.#hierarchies = roles.map((role, i) => {
      const priority = ++i;
      return { role, priority };
    });
  }

  private getPriority(role: RightsEnum): number {
    const hierarchy = this.#hierarchies.find((h) => h.role === role);
    return hierarchy ? hierarchy.priority : -1;
  }

  public isAuthorized({ currentRoles, requiredRole }: IAuthorizedParams): boolean {
    const requiredPriority = this.getPriority(requiredRole);
    if (requiredPriority === 1) return true;
    const currentPriorities = currentRoles?.map((role) => this.getPriority(role)) ?? [1];
    const currentHighPriority = Math.max(...currentPriorities);
    return currentHighPriority >= requiredPriority;
  }
}
