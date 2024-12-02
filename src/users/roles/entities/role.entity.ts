import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../shared/utils/base.entity';
import { User } from '../../entities/user.entity';

@Entity()
export class Role extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
