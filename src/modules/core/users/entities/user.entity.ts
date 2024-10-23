import { Column, Entity, JoinTable, ManyToMany, OneToOne } from 'typeorm';
import { Role } from 'src/modules/core/roles/entities/role.entity';
import { Program } from 'src/modules/features/programs/entities/program.entity';
import { Notification } from 'src/modules/utilities/notifications/entities/notification.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Detail } from './detail.entity';

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

  @ManyToMany(() => Program, (program) => program.users)
  @JoinTable({ name: 'user_programs' })
  programs: Program[];

  @ManyToMany(() => Notification, (notification) => notification.recipients)
  @JoinTable({ name: 'user_notifications' })
  notifications: Notification[];

  @OneToOne(() => Detail, (detail) => detail.user)
  detail: Detail;
}
