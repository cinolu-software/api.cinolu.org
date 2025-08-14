import { BaseEntity } from 'src/shared/utils/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Role extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  label: string;
}
