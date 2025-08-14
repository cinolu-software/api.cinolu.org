import { Injectable } from '@nestjs/common';
import { RoleEnum } from '../../shared/enums/roles.enum';
import { Ihierarchy } from './types/hierarchy.type';
import { IAuthorizedParams } from './types/authorized-params.type';

@Injectable()
export class RightsService {
  #hierarchies: Ihierarchy[] = [];

  constructor() {
    this.buildRoles([RoleEnum.Guest, RoleEnum.User, RoleEnum.Coach, RoleEnum.Staff, RoleEnum.Admin]);
  }

  private buildRoles(roles: RoleEnum[]): void {
    this.#hierarchies = roles.map((role, i) => {
      const priority = ++i;
      return { role, priority };
    });
  }

  private getPriority(role: RoleEnum): number {
    const hierarchy = this.#hierarchies.find((h) => h.role === role);
    return hierarchy ? hierarchy.priority : -1;
  }

  public isAuthorized({ currentRoles, requiredRole }: IAuthorizedParams): boolean {
    const requiredPriority = this.getPriority(requiredRole);
    const currentPriorities = currentRoles?.map((role) => this.getPriority(role)) ?? [1];
    const currentHighPriority = Math.max(...currentPriorities);
    return currentHighPriority >= requiredPriority;
  }
}
