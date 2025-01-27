import { Column, Entity, JoinTable, ManyToMany, OneToOne } from 'typeorm';
import { User } from '../../entities/user.entity';
import { AbstractEntity } from '../../../shared/utils/abstract.entity';
import { Expertise } from '../../expertises/entities/expertise.entity';
import { Position } from '../../positions/entities/position.entity';

@Entity()
export class Detail extends AbstractEntity {
  @Column({ type: 'text' })
  bio: string;

  @Column({ type: 'json', nullable: true })
  socials: JSON;

  @OneToOne(() => User, (user) => user.detail)
  user: User;

  @ManyToMany(() => Expertise, (expertise) => expertise.details)
  @JoinTable({ name: 'detail_expertises' })
  expertises: Expertise[];

  @ManyToMany(() => Position, (positions) => positions.details)
  @JoinTable({ name: 'detail_positions' })
  positions: Position[];
}
