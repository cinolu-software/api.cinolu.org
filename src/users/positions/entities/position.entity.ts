import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../../../shared/utils/abstract.entity';
import { Detail } from '../../details/entities/detail.entity';

@Entity()
export class Position extends AbstractEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToMany(() => Detail, (detail) => detail.expertises)
  details: Detail[];
}
