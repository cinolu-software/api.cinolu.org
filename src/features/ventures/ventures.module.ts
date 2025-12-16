import { Module } from '@nestjs/common';
import { VenturesService } from './core/ventures.service';
import { VenturesController } from './core/ventures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venture } from './core/entities/venture.entity';
import { VentureSubscriber } from './core/subscribers/venture.subscriber';
import { ProductsRootModule } from './products/products-root.module';
import { GalleriesModule } from '../galleries/galleries.module';

@Module({
  imports: [TypeOrmModule.forFeature([Venture]), ProductsRootModule, GalleriesModule],
  controllers: [VenturesController],
  providers: [VenturesService, VentureSubscriber],
  exports: [VenturesService]
})
export class VenturesModule {}
