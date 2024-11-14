import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../../utilities/entities/base.entity';
import { User } from '../../../../core/users/entities/user.entity';

@Entity()
export class Role extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
