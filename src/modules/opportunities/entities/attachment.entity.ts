import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@/core/database/abstract.entity';
import { Opportunity } from './opportunity.entity';

@Entity()
export class OpportunityAttachment extends AbstractEntity {
  @Column()
  filename: string;

  @ManyToOne(() => Opportunity, (opportunity) => opportunity.attachments, { onDelete: 'CASCADE' })
  @JoinColumn()
  opportunity: Opportunity;
}
