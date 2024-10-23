import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { Social } from './social.entity';
import { User } from './user.entity';
import { Expertise } from '../../../features/expertises/entities/expertise.entity';

@Entity()
export class Detail extends BaseEntity {
  @Column({ type: 'text' })
  bio: string;

  @OneToMany(() => Social, (social) => social.detail)
  socials: Social[];

  @OneToOne(() => User, (user) => user.detail)
  user: User;

  @ManyToMany(() => Expertise, (expertise) => expertise.details)
  @JoinTable({ name: 'detail_expertises' })
  expertises: Expertise[];
}
