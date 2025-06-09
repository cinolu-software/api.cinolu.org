import { BaseEntity } from 'src/shared/utils/abstract.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Product } from '../../entities/product.entity';

@Entity()
export class ProductCategory extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
