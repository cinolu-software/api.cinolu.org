import { Controller, Post, Body, Patch, Param, Delete, Query, Get } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CurrentUser } from '../../shared/decorators/user.decorator';
import { User } from '../../users/entities/user.entity';
import { Comment } from './entities/comment.entity';
import { RoleEnum } from 'src/shared/enums/roles.enum';
import { Auth } from 'src/shared/decorators/auth.decorators';

@Controller('post-comments')
@Auth(RoleEnum.User)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreateCommentDto): Promise<Comment> {
    return this.commentsService.create(user, dto);
  }

  @Get(':slug')
  @Auth(RoleEnum.Guest)
  findAll(@Param('slug') slug: string, @Query('page') page: number): Promise<[Comment[], number]> {
    return this.commentsService.findAll(slug, page);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCommentDto): Promise<Comment> {
    return this.commentsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.commentsService.remove(id);
  }
}
