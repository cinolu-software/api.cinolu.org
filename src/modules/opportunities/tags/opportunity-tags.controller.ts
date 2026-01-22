import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OpportunityTagsService } from './opportunity-tags.service';
import { CreateOpportunityTagDto } from './dto/create-opportunity-tag.dto';
import { UpdateOpportunityTagDto } from './dto/update-opportunity-tag.dto';
import { FilterOpportunityTagsDto } from './dto/filter-opportunity-tags.dto';
import { OpportunityTag } from './entities/opportunity-tag.entity';
import { UseRoles } from 'nest-access-control';
import { Public } from '@/core/auth/decorators/public.decorator';

@Controller('opportunity-tags')
export class OpportunityTagsController {
  constructor(private tagsService: OpportunityTagsService) {}

  @Post()
  @UseRoles({ resource: 'tags', action: 'create' })
  create(@Body() dto: CreateOpportunityTagDto): Promise<OpportunityTag> {
    return this.tagsService.create(dto);
  }

  @Get('filtered')
  @UseRoles({ resource: 'tags', action: 'read' })
  findFiltered(@Query() dto: FilterOpportunityTagsDto): Promise<[OpportunityTag[], number]> {
    return this.tagsService.findFiltered(dto);
  }

  @Get()
  @Public()
  findAll(): Promise<OpportunityTag[]> {
    return this.tagsService.findAll();
  }

  @Get(':id')
  @UseRoles({ resource: 'tags', action: 'read' })
  findOne(@Param('id') id: string): Promise<OpportunityTag> {
    return this.tagsService.findOne(id);
  }

  @Patch(':id')
  @UseRoles({ resource: 'tags', action: 'update' })
  update(@Param('id') id: string, @Body() dto: UpdateOpportunityTagDto): Promise<OpportunityTag> {
    return this.tagsService.update(id, dto);
  }

  @Delete(':id')
  @UseRoles({ resource: 'tags', action: 'update' })
  remove(@Param('id') id: string): Promise<void> {
    return this.tagsService.remove(id);
  }
}
