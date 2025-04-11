import { Category } from 'src/ecosystem/categories/entities/category.entity';
import { AbstractEntity } from 'src/shared/utils/abstract.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Organization extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  website: string;

  @Column()
  location: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  logo: string;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}
