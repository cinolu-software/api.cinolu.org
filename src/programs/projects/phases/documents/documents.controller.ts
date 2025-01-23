import { Controller, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { DocumentsService } from './documents.service';
import { Authorization } from '../../../../shared/decorators/rights.decorators';
import { RoleEnum } from '../../../../shared/enums/roles.enum';
import { UpdateProjectDto } from '../../dto/update-project.dto';
import { Document } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';

@Controller('phase-documents')
@Authorization(RoleEnum.Staff)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get('')
  @Authorization(RoleEnum.Guest)
  findAll(): Promise<{ data: Document[] }> {
    return this.documentsService.findAll();
  }

  @Post('')
  create(@Body() createDocumentDto: CreateDocumentDto): Promise<{ data: Document }> {
    return this.documentsService.create(createDocumentDto);
  }

  @Post('document/:id')
  @UseInterceptors(
    FileInterceptor('document', {
      storage: diskStorage({
        destination: './uploads/projects/documents',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addFile(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<{ data: Document }> {
    return this.documentsService.addFile(id, file);
  }

  @Delete('document/:id')
  removeFile(@Param('id') id: string): Promise<{ data: Document }> {
    return this.documentsService.removeFile(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto): Promise<{ data: Document }> {
    return this.documentsService.update(id, dto);
  }

  @Post('restore/:id')
  restore(@Param('id') id: string): Promise<{ data: Document }> {
    return this.documentsService.restore(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.documentsService.remove(id);
  }
}
