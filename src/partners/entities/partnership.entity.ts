import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../shared/utils/base.entity';
import { Partner } from './partner.entity';

@Entity()
export class Partnership extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @ManyToMany(() => Partner, (partner) => partner.partnerships)
  partners: Partner[];
}
