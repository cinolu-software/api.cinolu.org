import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../../shared/utils/abstract.entity';
import { Venture } from '../../entities/venture.entity';
import { Gallery } from '../../../galleries/entities/gallery.entity';

@Entity()
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Venture, (venture) => venture.products)
  @JoinColumn()
  venture: Venture;

  @OneToMany(() => Gallery, (gallery) => gallery.product)
  gallery: Gallery[];
}
