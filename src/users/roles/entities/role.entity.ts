import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../shared/utils/abstract.entity';

@Entity()
export class Role extends BaseEntity {
  @Column({ unique: true })
  name: string;
}
