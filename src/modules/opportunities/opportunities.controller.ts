import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { OpportunitiesService } from './opportunities.service';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { FilterOpportunitiesDto } from './dto/filter-opportunities.dto';
import { UseRoles } from 'nest-access-control';
import { CurrentUser } from '@/core/auth/decorators/current-user.decorator';
import { User } from '@/modules/users/entities/user.entity';
import { Public } from '@/core/auth/decorators/public.decorator';
import { Opportunity } from './entities/opportunity.entity';
import { OpportunityAttachment } from './entities/attachment.entity';

@Controller('opportunities')
export class OpportunitiesController {
  constructor(private readonly opportunitiesService: OpportunitiesService) {}

  @Post()
  @UseRoles({ resource: 'opportunities', action: 'create' })
  create(@Body() createOpportunityDto: CreateOpportunityDto, @CurrentUser() user: User): Promise<Opportunity> {
    return this.opportunitiesService.create(createOpportunityDto, user);
  }

  @Get('for-me')
  findForUser(@CurrentUser() user: User): Promise<[Opportunity[], number]> {
    return this.opportunitiesService.findForUser(user);
  }

  @Get('all')
  @UseRoles({ resource: 'opportunities', action: 'read' })
  findAllForAdmin(@Query() filterDto: FilterOpportunitiesDto): Promise<[Opportunity[], number]> {
    return this.opportunitiesService.findAllForAdmin(filterDto);
  }

  @Get()
  @Public()
  findAll(@Query() filterDto: FilterOpportunitiesDto): Promise<[Opportunity[], number]> {
    return this.opportunitiesService.findAll(filterDto);
  }

  @Get('slug/:slug')
  @Public()
  findBySlug(@Param('slug') slug: string): Promise<Opportunity> {
    return this.opportunitiesService.findBySlug(slug);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string): Promise<Opportunity> {
    return this.opportunitiesService.findOne(id);
  }

  @Patch(':id')
  @UseRoles({ resource: 'opportunities', action: 'update' })
  update(@Param('id') id: string, @Body() updateOpportunityDto: UpdateOpportunityDto): Promise<Opportunity> {
    return this.opportunitiesService.update(id, updateOpportunityDto);
  }

  @Delete(':id')
  @UseRoles({ resource: 'opportunities', action: 'delete' })
  remove(@Param('id') id: string): Promise<void> {
    return this.opportunitiesService.remove(id);
  }

  @Post(':id/attachments')
  @UseRoles({ resource: 'opportunities', action: 'update' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/opportunities/attachments',
        filename: function (_req, file, cb) {
          const extension = file.mimetype.split('/')[1] || 'bin';
          cb(null, `${uuidv4()}.${extension}`);
        }
      })
    })
  )
  addAttachment(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<OpportunityAttachment> {
    return this.opportunitiesService.addAttachment(id, file);
  }

  @Delete(':id/attachments/:attachmentId')
  @UseRoles({ resource: 'opportunities', action: 'update' })
  removeAttachment(@Param('attachmentId') attachmentId: string): Promise<void> {
    return this.opportunitiesService.removeAttachment(attachmentId);
  }
}
