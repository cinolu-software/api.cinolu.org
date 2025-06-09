import { BaseEntity } from 'src/shared/utils/abstract.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { ProductCategory } from '../categories/entities/category.entity';
import { Enterprise } from 'src/enterprises/entities/enterprise.entity';
import { ProductImage } from '../product-images/entities/product-image.entity';

@Entity()
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @OneToMany(() => ProductImage, (productGallery) => productGallery.product)
  gallery: ProductImage[];

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.products)
  @JoinColumn()
  enterprise: Enterprise;

  @ManyToMany(() => ProductCategory, (category) => category.products)
  @JoinTable()
  categories: ProductCategory[];
}
