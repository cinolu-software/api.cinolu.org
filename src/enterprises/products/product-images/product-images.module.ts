import { Module } from '@nestjs/common';
import { ProductImagesService } from './product-images.service';
import { ProductImagesController } from './product-images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from './entities/product-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImage])],
  controllers: [ProductImagesController],
  providers: [ProductImagesService]
})
export class ProductImagesModule {}
