import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../../@core/utilities/base.entity';
import { Partner } from '../../partners/entities/partner.entity';

@Entity()
export class Partnership extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @ManyToMany(() => Partner, (partner) => partner.partnerships)
  partners: Partner[];
}
