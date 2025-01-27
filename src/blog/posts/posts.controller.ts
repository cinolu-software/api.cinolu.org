import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as P } from './entities/post.entity';
import { CurrentUser } from '../../shared/decorators/user.decorator';
import { User } from '../../users/entities/user.entity';
import { Authorization } from '../../shared/decorators/rights.decorators';
import { RoleEnum } from '../../shared/enums/roles.enum';

@Controller('blog-posts')
@Authorization(RoleEnum.Staff)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreatePostDto): Promise<{ data: P }> {
    return this.postsService.create(user, dto);
  }

  @Get()
  findAll(): Promise<{ data: P[] }> {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ data: P }> {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePostDto): Promise<{ data: P }> {
    return this.postsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.postsService.remove(id);
  }
}
