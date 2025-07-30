import { User } from 'src/modules/users/entities/user.entity';
import { BaseEntity } from 'src/shared/utils/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Venture extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  problem_solved: string;

  @Column({ type: 'text' })
  target_market: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  cover: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  linkedin_url: string;

  @Column({ nullable: true })
  sector: string;

  @Column({ type: 'boolean', default: false })
  is_published: boolean;

  @Column({ type: 'date', nullable: true })
  founded_at: Date;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  stage: string;

  @ManyToOne(() => User, (user) => user.ventures)
  @JoinColumn()
  owner: User;
}
