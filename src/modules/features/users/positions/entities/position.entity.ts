import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../../utilities/entities/base.entity';
import { Detail } from '../../../../core/users/entities/detail.entity';

@Entity()
export class Position extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToMany(() => Detail, (detail) => detail.expertises)
  details: Detail[];
}
