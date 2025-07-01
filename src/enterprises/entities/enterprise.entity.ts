import { BaseEntity } from 'src/shared/utils/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Enterprise extends BaseEntity {
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

  @Column({ type: 'date', nullable: true })
  founded_at: Date;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  stage: string;

  @OneToMany(() => Product, (product) => product.enterprise)
  products: Product[];

  @ManyToOne(() => User, (user) => user.enterprises)
  @JoinColumn()
  owner: User;
}
