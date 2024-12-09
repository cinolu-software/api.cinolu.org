import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../../shared/utils/abstract.entity';
import { Venture } from './venture.entity';

@Entity()
export class Sector extends AbstractEntity {
  @Column()
  name: string;

  @ManyToMany(() => Venture, (venture) => venture.sectors)
  ventures: Sector[];
}
