import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../shared/utils/abstract.entity';

@Entity()
export class Expertise extends BaseEntity {
  @Column()
  name: string;
}
