import { Column, Entity, ManyToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BaseEntity } from '../../../../common/entities/base.entity';

@Entity()
export class Role extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
