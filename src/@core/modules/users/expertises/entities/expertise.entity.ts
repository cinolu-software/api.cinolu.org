import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '@core/utilities/base.entity';
import { Detail } from '../../users/entities/detail.entity';

@Entity()
export class Expertise extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToMany(() => Detail, (detail) => detail.expertises)
  details: Detail[];
}
