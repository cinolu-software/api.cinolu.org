import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { FilterTagsDto } from './dto/filter-tags.dto';
import { Tag } from './entities/tag.entity';
import { Roles } from '@/core/auth/decorators/role.decorator';
import { Public } from '@/core/auth/decorators/public.decorator';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @Roles({ resource: 'tags', action: 'create' })
  create(@Body() dto: CreateTagDto): Promise<Tag> {
    return this.tagsService.create(dto);
  }

  @Get('paginated')
  @Roles({ resource: 'tags', action: 'read' })
  findPaginated(@Query() query: FilterTagsDto): Promise<[Tag[], number]> {
    return this.tagsService.findFiltered(query);
  }

  @Get()
  @Public()
  findAll(): Promise<Tag[]> {
    return this.tagsService.findAll();
  }

  @Get(':id')
  @Roles({ resource: 'tags', action: 'read' })
  findOne(@Param('id') id: string): Promise<Tag> {
    return this.tagsService.findOne(id);
  }

  @Patch(':id')
  @Roles({ resource: 'tags', action: 'update' })
  update(@Param('id') id: string, @Body() dto: UpdateTagDto): Promise<Tag> {
    return this.tagsService.update(id, dto);
  }

  @Delete(':id')
  @Roles({ resource: 'tags', action: 'update' })
  remove(@Param('id') id: string): Promise<void> {
    return this.tagsService.remove(id);
  }
}
