import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { User } from 'src/core/users/entities/user.entity';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { FilterCommentsDto } from './dto/filter-comments.dto';
import { UseRoles } from 'nest-access-control';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreateCommentDto): Promise<Comment> {
    return this.commentsService.create(dto, user);
  }

  @Get()
  @UseRoles({ resource: 'comments', action: 'read' })
  findAll(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }

  @Get('article/:id')
  @UseRoles({ resource: 'comments', action: 'read' })
  findByArticle(@Param('id') id: string, @Query() dto: FilterCommentsDto): Promise<[Comment[], number]> {
    return this.commentsService.findByArticle(id, dto);
  }

  @Get(':id')
  @UseRoles({ resource: 'comments', action: 'read' })
  findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  @UseRoles({ resource: 'comments', action: 'update' })
  update(@Param('id') id: string, @Body() dto: UpdateCommentDto): Promise<Comment> {
    return this.commentsService.update(id, dto);
  }

  @Delete(':id')
  @UseRoles({ resource: 'comments', action: 'delete' })
  remove(@Param('id') id: string): Promise<void> {
    return this.commentsService.remove(id);
  }
}
