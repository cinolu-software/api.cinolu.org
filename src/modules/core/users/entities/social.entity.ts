import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { Detail } from './detail.entity';

@Entity()
export class Social extends BaseEntity {
  @Column()
  name: string;

  @Column()
  link: string;

  @ManyToOne(() => Detail, (detail) => detail.socials)
  detail: Detail;
}
