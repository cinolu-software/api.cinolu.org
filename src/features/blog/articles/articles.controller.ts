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
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { FilterArticlesDto } from './dto/filter-articles.dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { User } from 'src/core/users/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { UseRoles } from 'nest-access-control';
import { Public } from '../../../shared/decorators/public.decorator';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Post()
  @UseRoles({
    resource: 'blogs',
    action: 'create'
  })
  create(@CurrentUser() user: User, @Body() dto: CreateArticleDto): Promise<Article> {
    return this.articlesService.create(dto, user);
  }

  @Get()
  @UseRoles({
    resource: 'blogs',
    action: 'read'
  })
  findAll(@Query() dto: FilterArticlesDto): Promise<[Article[], number]> {
    return this.articlesService.findAll(dto);
  }

  @Post('cover/:id')
  @UseRoles({
    resource: 'blogs',
    action: 'update'
  })
  @UseInterceptors(
    FileInterceptor('article/:id', {
      storage: diskStorage({
        destination: './uploads/articles',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<Article> {
    return this.articlesService.addImage(id, file);
  }

  @Get('find-published')
  @Public()
  findPublished(@Query() dto: FilterArticlesDto): Promise<[Article[], number]> {
    return this.articlesService.findPublished(dto);
  }

  @Post('toggle-published/:id')
  @UseRoles({
    resource: 'blogs',
    action: 'update'
  })
  togglePublished(@Param('id') id: string): Promise<Article> {
    return this.articlesService.togglePublished(id);
  }

  @Get('slug/:slug')
  @Public()
  findBySlug(@Param('slug') slug: string): Promise<Article> {
    return this.articlesService.findBySlug(slug);
  }

  @Get(':id')
  @UseRoles({
    resource: 'blogs',
    action: 'read'
  })
  findOne(@Param('id') id: string): Promise<Article> {
    return this.articlesService.findOne(id);
  }

  @Patch(':id')
  @UseRoles({
    resource: 'blogs',
    action: 'update'
  })
  update(@Param('id') id: string, @Body() dto: UpdateArticleDto): Promise<Article> {
    return this.articlesService.update(id, dto);
  }

  @Delete(':id')
  @UseRoles({
    resource: 'blogs',
    action: 'delete'
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.articlesService.remove(id);
  }
}
