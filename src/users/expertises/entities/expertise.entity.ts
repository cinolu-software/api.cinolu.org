import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../shared/utils/abstract.entity';

@Entity()
export class Expertise extends AbstractEntity {
  @Column()
  name: string;
}
