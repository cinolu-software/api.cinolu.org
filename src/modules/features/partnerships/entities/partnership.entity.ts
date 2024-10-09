import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { Partner } from '../../partners/entities/partner.entity';

@Entity()
export class Partnership extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @ManyToMany(() => Partner, (partner) => partner.partnerships)
  partners: Partner[];
}
