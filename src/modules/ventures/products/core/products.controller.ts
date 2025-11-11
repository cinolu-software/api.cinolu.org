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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { UseRoles } from 'nest-access-control';
import { FilterProductsDto } from './dto/filter-products.dto';
import { CurrentUser } from '@/core/auth/decorators/current-user.decorator';
import { User } from '@/core/users/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Gallery } from '@/modules/galleries/entities/gallery.entity';
import { Public } from '@/core/auth/decorators/public.decorator';
import { v4 as uuidv4 } from 'uuid';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.productsService.create(dto);
  }

  @Post('gallery/:id')
  @UseRoles({ resource: 'products', action: 'update', possession: 'own' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/galleries',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addGallery(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<void> {
    return this.productsService.addGallery(id, file);
  }

  @Delete('gallery/remove/:id')
  @UseRoles({ resource: 'products', action: 'update', possession: 'own' })
  removeGallery(@Param('id') id: string): Promise<void> {
    return this.productsService.removeGallery(id);
  }

  @Get('gallery/:slug')
  @Public()
  findGallery(@Param('slug') slug: string): Promise<Gallery[]> {
    return this.productsService.findGallery(slug);
  }

  @Get('by-user')
  @UseRoles({ resource: 'products', action: 'read', possession: 'own' })
  findAll(@CurrentUser() user: User, @Query() query: FilterProductsDto): Promise<[Product[], number]> {
    return this.productsService.findAll(user, query);
  }

  @Get(':slug')
  @Public()
  findOne(@Param('slug') slug: string): Promise<Product> {
    return this.productsService.findBySlug(slug);
  }

  @Patch(':slug')
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
