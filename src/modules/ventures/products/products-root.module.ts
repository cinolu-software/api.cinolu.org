import { Module } from '@nestjs/common';
import { ProductsModule } from './core/products.module';

@Module({
  imports: [ProductsModule],
  exports: [ProductsModule]
})
export class ProductsRootModule {}
