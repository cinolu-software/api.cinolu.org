import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductMediaService } from './services/product-media.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { UseRoles } from 'nest-access-control';
import { FilterProductsDto } from './dto/filter-products.dto';
import { CurrentUser } from '@/core/auth/decorators/current-user.decorator';
import { User } from '@/modules/users/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { createDiskUploadOptions } from '@/core/helpers/upload.helper';
import { Gallery } from '@/modules/galleries/entities/gallery.entity';
import { Public } from '@/core/auth/decorators/public.decorator';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productMediaService: ProductMediaService
  ) {}

  @Post()
  create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.productsService.create(dto);
  }

  @Post(':productId/gallery')
  @UseRoles({ resource: 'products', action: 'update', possession: 'own' })
  @UseInterceptors(FileInterceptor('image', createDiskUploadOptions('./uploads/galleries')))
  addGallery(@Param('productId') productId: string, @UploadedFile() file: Express.Multer.File): Promise<void> {
    return this.productMediaService.addGallery(productId, file);
  }

  @Delete('gallery/:galleryId')
  @UseRoles({ resource: 'products', action: 'update', possession: 'own' })
  removeGallery(@Param('galleryId') galleryId: string): Promise<void> {
    return this.productMediaService.removeGallery(galleryId);
  }

  @Get('by-slug/:slug/gallery')
  @Public()
  findGallery(@Param('slug') slug: string): Promise<Gallery[]> {
    return this.productMediaService.findGallery(slug);
  }

  @Get('me')
  @UseRoles({ resource: 'products', action: 'read', possession: 'own' })
  findMine(@CurrentUser() user: User, @Query() query: FilterProductsDto): Promise<[Product[], number]> {
    return this.productsService.findAll(user, query);
  }

  @Get('by-slug/:slug')
  @Public()
  findOne(@Param('slug') slug: string): Promise<Product> {
    return this.productsService.findBySlug(slug);
  }

  @Patch('by-slug/:slug')
  @UseRoles({ resource: 'products', action: 'update', possession: 'own' })
  update(@Param('slug') slug: string, @Body() dto: UpdateProductDto): Promise<Product> {
    return this.productsService.update(slug, dto);
  }

  @Delete(':id')
  @UseRoles({ resource: 'products', action: 'delete', possession: 'own' })
  remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(id);
  }
}
