import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '@core/utilities/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Role extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
