import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { FilterTagsDto } from './dto/filter-tags.dto';
import { Tag } from './entities/tag.entity';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Post()
  create(@Body() dto: CreateTagDto): Promise<Tag> {
    return this.tagsService.create(dto);
  }

  @Get('filtered')
  findFiltered(@Query() dto: FilterTagsDto): Promise<[Tag[], number]> {
    return this.tagsService.findFiltered(dto);
  }

  @Get()
  findAll(): Promise<Tag[]> {
    return this.tagsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Tag> {
    return this.tagsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTagDto): Promise<Tag> {
    return this.tagsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tagsService.remove(id);
  }
}
