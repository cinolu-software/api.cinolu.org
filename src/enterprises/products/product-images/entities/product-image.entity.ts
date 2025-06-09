import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { BaseEntity } from 'src/shared/utils/abstract.entity';

@Entity()
export class ProductImage extends BaseEntity {
  @Column()
  image: string;

  @ManyToOne(() => Product, (product) => product.gallery)
  @JoinColumn()
  product: Product;
}
