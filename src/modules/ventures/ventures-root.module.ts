import { Module } from '@nestjs/common';
import { VenturesModule } from './core/ventures.module';
import { ProductsRootModule } from './products/products-root.module';

@Module({
  imports: [VenturesModule, ProductsRootModule],
  exports: [VenturesModule, ProductsRootModule]
})
export class VenturesRootModule {}
