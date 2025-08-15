import { User } from '../users/entities/user.entity';
import { AbilityBuilder, createMongoAbility, ExtractSubjectType, InferSubjects, MongoAbility } from '@casl/ability';
import { Injectable } from '@nestjs/common';

type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete'
}

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);
    const roles = user.roles as unknown as string[];
    const isAdmin = roles.includes('admin');
    if (isAdmin) can(Action.Manage, 'all');
    else {
      can(Action.Read, 'all');
      can(Action.Create, User);
      can(Action.Update, User);
      cannot(Action.Delete, User);
    }
    return build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>
    });
  }
}
