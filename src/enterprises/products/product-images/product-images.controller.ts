import { Controller, Post, Param, Delete, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProductImagesService } from './product-images.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { ProductImage } from './entities/product-image.entity';

@Controller('product-images')
export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) {}

  @Post(':id')
  @UseInterceptors(
    FilesInterceptor('products', 5, {
      storage: diskStorage({
        destination: './uploads/products',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addImage(@Param('id') id: string, @UploadedFiles() files: Express.Multer.File[]): Promise<ProductImage[]> {
    return this.productImagesService.addImages(id, files);
  }

  @Delete(':id')
  deleteImage(@Param('id') id: string): Promise<void> {
    return this.productImagesService.deleteImage(id);
  }
}
