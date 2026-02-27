import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductSubscriber } from './subscribers/product.subscriber';
import { ProductMediaService } from './services/product-media.service';
import { GalleriesModule } from '@/shared/galleries/galleries.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), GalleriesModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductMediaService, ProductSubscriber],
  exports: [ProductsService]
})
export class ProductsModule {}
