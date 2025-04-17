import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Query,
  Req
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as P } from './entities/post.entity';
import { CurrentUser } from '../../shared/decorators/user.decorator';
import { User } from '../../users/entities/user.entity';
import { Auth } from '../../shared/decorators/auth.decorators';
import { RoleEnum } from '../../shared/enums/roles.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { QueryParams } from './utils/query-params.type';
import { Request } from 'express';

@Controller('blog-posts')
@Auth(RoleEnum.Staff)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreatePostDto): Promise<P> {
    return this.postsService.create(user, dto);
  }

  @Post('like/:id')
  @Auth(RoleEnum.User)
  likePost(@Param('id') id: string, @CurrentUser() user: User): Promise<P> {
    return this.postsService.like(id, user.id);
  }

  @Post('dislike/:id')
  @Auth(RoleEnum.User)
  dislikePost(@Param('id') id: string, @CurrentUser() user: User): Promise<P> {
    return this.postsService.unlike(id, user.id);
  }

  @Post('view/:id')
  @Auth(RoleEnum.User)
  viewPost(@Param('id') id: string, @Req() req: Request): Promise<P> {
    return this.postsService.view(id, req);
  }

  @Post('image-cover/:id')
  @UseInterceptors(
    FileInterceptor('thumb', {
      storage: diskStorage({
        destination: './uploads/posts',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  uploadImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<P> {
    return this.postsService.uploadImage(id, file);
  }

  @Get()
  @Auth(RoleEnum.Guest)
  findAll(@Query() queryParams: QueryParams): Promise<[P[], count: number]> {
    return this.postsService.findAll(queryParams);
  }

  @Get('recent')
  @Auth(RoleEnum.Guest)
  getRecentPosts(): Promise<P[]> {
    return this.postsService.getRecentPosts();
  }

  @Get('slug/:slug')
  @Auth(RoleEnum.Guest)
  findBySlug(@Param('slug') slug: string): Promise<P> {
    return this.postsService.findBySlug(slug);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePostDto): Promise<P> {
    return this.postsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.postsService.remove(id);
  }
}
