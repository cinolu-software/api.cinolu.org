import { Column, Entity, ManyToMany } from 'typeorm';
import { Detail } from '../../users/entities/detail.entity';
import { BaseEntity } from '../../../../shared/utils/base.entity';

@Entity()
export class Position extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToMany(() => Detail, (detail) => detail.expertises)
  details: Detail[];
}
