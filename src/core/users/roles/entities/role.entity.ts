import { AbstractEntity } from 'src/core/database/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Role extends AbstractEntity {
  @Column({ unique: true })
  name: string;
}
