import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from '../../shared/utils/base.entity';
import { Expertise } from '../expertises/entities/expertise.entity';
import { Position } from '../positions/entities/position.entity';

@Entity()
export class Detail extends BaseEntity {
  @Column({ type: 'text' })
  bio: string;

  @Column({ type: 'json', nullable: true })
  socials: JSON;

  @OneToOne(() => User, (user) => user.detail)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Expertise, (expertise) => expertise.details)
  @JoinTable({ name: 'detail_expertises' })
  expertises: Expertise[];

  @ManyToMany(() => Position, (positions) => positions.details)
  @JoinTable({ name: 'detail_positions' })
  positions: Position[];
}
