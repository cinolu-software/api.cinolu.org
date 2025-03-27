import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../shared/utils/abstract.entity';

@Entity()
export class Role extends AbstractEntity {
  @Column({ unique: true })
  name: string;
}
