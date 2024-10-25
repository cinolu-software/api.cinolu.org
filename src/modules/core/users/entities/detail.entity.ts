import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { Social } from './social.entity';
import { User } from './user.entity';
import { Expertise } from '../../../features/users/expertises/entities/expertise.entity';

@Entity()
export class Detail extends BaseEntity {
  @Column({ type: 'text' })
  bio: string;

  @OneToMany(() => Social, (social) => social.detail)
  socials: Social[];

  @OneToOne(() => User, (user) => user.details)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Expertise, (expertise) => expertise.details)
  @JoinTable({ name: 'detail_expertises' })
  expertises: Expertise[];
}
