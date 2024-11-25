import { Column, Entity, ManyToMany } from 'typeorm';
import { Detail } from '../../users/entities/detail.entity';
import { BaseEntity } from '../../../../utils/base.entity';

@Entity()
export class Expertise extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToMany(() => Detail, (detail) => detail.expertises)
  details: Detail[];
}
