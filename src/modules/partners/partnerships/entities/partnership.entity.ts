import { Column, Entity, ManyToMany } from 'typeorm';
import { Partner } from '../../partners/entities/partner.entity';
import { BaseEntity } from '../../../../shared/utils/base.entity';

@Entity()
export class Partnership extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @ManyToMany(() => Partner, (partner) => partner.partnerships)
  partners: Partner[];
}
