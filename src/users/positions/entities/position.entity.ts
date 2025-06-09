import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../shared/utils/abstract.entity';

@Entity()
export class Position extends BaseEntity {
  @Column()
  name: string;
}
