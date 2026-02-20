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
import { ArticlesService } from './services/articles.service';
import { ArticleMediaService } from './services/article-media.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { FilterArticlesDto } from './dto/filter-articles.dto';
import { CurrentUser } from '@/core/auth/decorators/current-user.decorator';
import { User } from '@/modules/users/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { createDiskUploadOptions } from '@/core/helpers/upload.helper';
import { UseRoles } from 'nest-access-control';
import { Public } from '@/core/auth/decorators/public.decorator';
import { Gallery } from '@/modules/galleries/entities/gallery.entity';

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly articleMediaService: ArticleMediaService
  ) {}

  @Post()
  @UseRoles({ resource: 'blogs', action: 'create' })
  create(@CurrentUser() user: User, @Body() dto: CreateArticleDto): Promise<Article> {
    return this.articlesService.create(dto, user);
  }

  @Get('recent')
  @Public()
  findRecent(): Promise<Article[]> {
    return this.articlesService.findRecent();
  }

  @Get()
  @UseRoles({ resource: 'blogs', action: 'read' })
  findAll(@Query() dto: FilterArticlesDto): Promise<[Article[], number]> {
    return this.articlesService.findAll(dto);
  }

  @Post(':articleId/gallery')
  @UseRoles({ resource: 'blogs', action: 'update' })
  @UseInterceptors(FileInterceptor('image', createDiskUploadOptions('./uploads/galleries')))
  addGallery(@Param('articleId') articleId: string, @UploadedFile() file: Express.Multer.File): Promise<void> {
    return this.articleMediaService.addGallery(articleId, file);
  }

  @Delete('gallery/:galleryId')
  @UseRoles({ resource: 'blogs', action: 'update' })
  removeGallery(@Param('galleryId') galleryId: string): Promise<void> {
    return this.articleMediaService.removeGallery(galleryId);
  }

  @Get('by-slug/:slug/gallery')
  @Public()
  findGallery(@Param('slug') slug: string): Promise<Gallery[]> {
    return this.articleMediaService.findGallery(slug);
  }

  @Post(':articleId/cover')
  @UseRoles({ resource: 'blogs', action: 'update' })
  @UseInterceptors(FileInterceptor('article', createDiskUploadOptions('./uploads/articles')))
  addCover(@Param('articleId') articleId: string, @UploadedFile() file: Express.Multer.File): Promise<Article> {
    return this.articleMediaService.addImage(articleId, file);
  }

  @Get('published')
  @Public()
  findPublished(@Query() dto: FilterArticlesDto): Promise<[Article[], number]> {
    return this.articlesService.findPublished(dto);
  }

  @Patch(':articleId/publish')
  @UseRoles({ resource: 'blogs', action: 'update' })
  togglePublished(@Param('articleId') articleId: string): Promise<Article> {
    return this.articlesService.togglePublished(articleId);
  }

  @Get('by-slug/:slug')
  @Public()
  findBySlug(@Param('slug') slug: string): Promise<Article> {
    return this.articlesService.findBySlug(slug);
  }

  @Get(':articleId')
  @UseRoles({ resource: 'blogs', action: 'read' })
  findOne(@Param('articleId') articleId: string): Promise<Article> {
    return this.articlesService.findOne(articleId);
  }

  @Patch(':articleId/highlight')
  @UseRoles({ resource: 'blogs', action: 'update' })
  toggleHighlight(@Param('articleId') articleId: string): Promise<Article> {
    return this.articlesService.highlight(articleId);
  }

  @Patch(':articleId')
  @UseRoles({ resource: 'blogs', action: 'update' })
  update(@Param('articleId') articleId: string, @Body() dto: UpdateArticleDto): Promise<Article> {
    return this.articlesService.update(articleId, dto);
  }

  @Delete(':articleId')
  @UseRoles({ resource: 'blogs', action: 'delete' })
  remove(@Param('articleId') articleId: string): Promise<void> {
    return this.articlesService.remove(articleId);
  }
}
