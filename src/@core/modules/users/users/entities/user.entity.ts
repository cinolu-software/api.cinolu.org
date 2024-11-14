import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { Notification } from '@core/modules/notifications/entities/notification.entity';
import { BaseEntity } from '@core/utilities/base.entity';
import { Detail } from './detail.entity';
import { Role } from '../../roles/entities/role.entity';
import { ProgramApplication } from '../../../../../features/programs/applications/entities/application.entity';
import { Program } from '../../../../../features/programs/programs/entities/program.entity';
import { Event } from '../../../../../features/events/events/entities/event.entity';

@Entity()
export class User extends BaseEntity {
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

  @OneToMany(() => ProgramApplication, (application) => application.applicant)
  applications: ProgramApplication[];

  @ManyToMany(() => Program)
  @JoinTable({ name: 'user_enrolled_programs' })
  enrolled_programs: Program[];

  @ManyToMany(() => Notification, (notification) => notification.recipients)
  @JoinTable({ name: 'user_notifications' })
  notifications: Notification[];

  @OneToOne(() => Detail, (detail) => detail.user)
  detail: Detail;

  @OneToMany(() => Event, (event) => event.responsible)
  events: Event[];
}
