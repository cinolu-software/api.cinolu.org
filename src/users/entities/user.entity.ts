import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { Detail } from './detail.entity';
import { AbstractEntity } from '../../shared/utils/abstract.entity';
import { Program } from '../../programs/entities/program.entity';
import { Event } from '../../events/entities/event.entity';
import { Role } from './role.entity';

@Entity()
export class User extends AbstractEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  google_image: string;

  @Column({ nullable: true })
  profile: string;

  @Column({ type: 'datetime', nullable: true, default: null })
  verified_at: Date;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: 'user_roles' })
  roles: Role[];

  @ManyToMany(() => Program)
  @JoinTable({ name: 'user_enrolled_programs' })
  enrolled_programs: Program[];

  @OneToOne(() => Detail, (detail) => detail.user)
  @JoinColumn()
  detail: Detail;

  @OneToMany(() => Event, (event) => event.responsible)
  events: Event[];
}
