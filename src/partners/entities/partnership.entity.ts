import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../../shared/utils/abstract.entity';
import { Partner } from './partner.entity';

@Entity()
export class Partnership extends AbstractEntity {
  @Column({ type: 'varchar' })
  name: string;

  @ManyToMany(() => Partner, (partner) => partner.partnerships)
  partners: Partner[];
}
