import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { Social } from './social.entity';

@Entity()
export class Detail extends BaseEntity {
  @Column({ type: 'text' })
  bio: string;

  @OneToMany(() => Social, (social) => social.detail)
  socials: Social[];
}
