import { AbstractEntity } from '@/core/database/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class OpportunityTag extends AbstractEntity {
  @Column({ unique: true })
  name: string;
}
