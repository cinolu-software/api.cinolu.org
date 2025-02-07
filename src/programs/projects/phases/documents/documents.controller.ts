import { Controller, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { DocumentsService } from './documents.service';
import { Auth } from '../../../../shared/decorators/auth.decorators';
import { RoleEnum } from '../../../../shared/enums/roles.enum';
import { UpdateProjectDto } from '../../dto/update-project.dto';
import { Document } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';

@Controller('phase-documents')
@Auth(RoleEnum.Staff)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get('')
  @Auth(RoleEnum.Guest)
  findAll(): Promise<Document[]> {
    return this.documentsService.findAll();
  }

  @Post('')
  create(@Body() createDocumentDto: CreateDocumentDto): Promise<Document> {
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
  addFile(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<Document> {
    return this.documentsService.addFile(id, file);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto): Promise<Document> {
    return this.documentsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.documentsService.remove(id);
  }
}
