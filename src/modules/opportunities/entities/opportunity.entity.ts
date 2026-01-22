import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '@/core/database/abstract.entity';
import { OpportunityTag } from '../tags/entities/tag.entity';
import { User } from '@/modules/users/entities/user.entity';
import { OpportunityAttachment } from './attachment.entity';

@Entity()
export class Opportunity extends AbstractEntity {
  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column({ nullable: true })
  link: string;

  @Column({ type: 'datetime' })
  started_at: Date;

  @Column({ type: 'datetime' })
  ended_at: Date;

  @ManyToMany(() => OpportunityTag, { cascade: true })
  @JoinTable()
  tags: OpportunityTag[];

  @ManyToOne(() => User, (user) => user.created_opportunities)
  @JoinColumn()
  creator: User;

  @OneToMany(() => OpportunityAttachment, (attachment) => attachment.opportunity, { cascade: true })
  attachments: OpportunityAttachment[];
}
