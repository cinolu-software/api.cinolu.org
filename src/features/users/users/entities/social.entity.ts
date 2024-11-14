import { Column, Entity, ManyToOne } from 'typeorm';
import { Detail } from './detail.entity';
import { BaseEntity } from '../../../../@core/utilities/base.entity';

@Entity()
export class Social extends BaseEntity {
  @Column()
  name: string;

  @Column()
  link: string;

  @ManyToOne(() => Detail, (detail) => detail.socials)
  detail: Detail;
}
