import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CategoriesModule } from './categories/categories.module';
import { ProductImagesModule } from './product-images/product-images.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductSubscriber } from './subscribers/product.subscriber';

@Module({
  imports: [CategoriesModule, ProductImagesModule, TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductSubscriber]
})
export class ProductsModule {}
