import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../shared/utils/abstract.entity';

@Entity()
export class Position extends AbstractEntity {
  @Column()
  name: string;
}
