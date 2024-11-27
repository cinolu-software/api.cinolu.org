import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { Social } from './social.entity';
import { User } from './user.entity';
import { Expertise } from '../../expertises/entities/expertise.entity';
import { Position } from '../../positions/entities/position.entity';
import { BaseEntity } from '../../../../shared/utils/base.entity';

@Entity()
export class Detail extends BaseEntity {
  @Column({ type: 'text' })
  bio: string;

  @OneToOne(() => User, (user) => user.detail)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Social, (social) => social.detail)
  socials: Social[];

  @ManyToMany(() => Expertise, (expertise) => expertise.details)
  @JoinTable({ name: 'detail_expertises' })
  expertises: Expertise[];

  @ManyToMany(() => Position, (positions) => positions.details)
  @JoinTable({ name: 'detail_positions' })
  positions: Position[];
}
