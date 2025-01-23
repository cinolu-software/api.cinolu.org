import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../../../shared/utils/abstract.entity';
import { User } from '../../entities/user.entity';

@Entity()
export class Role extends AbstractEntity {
  @Column({ unique: true })
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
