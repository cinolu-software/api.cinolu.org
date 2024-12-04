import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../shared/utils/base.entity';

@Entity()
export class Call extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'json' })
  form: JSON;
}
