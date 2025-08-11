import { BaseEntity } from 'src/shared/utils/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Tag extends BaseEntity {
  @Column({ unique: true })
  name: string;
}
