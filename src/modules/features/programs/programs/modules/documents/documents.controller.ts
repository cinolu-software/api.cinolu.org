import { Controller, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Roles } from '../../../../../core/access-control/decorators/roles.decorators';
import { RolesEnum } from '../../../../../core/access-control/enums/roles.enum';
import { UpdateProgramDto } from '../../dto/update-program.dto';
import { DocumentsService } from './documents.service';
import { ProgramDocument } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';

@Controller('program-documents')
@Roles(RolesEnum.Staff)
export class ProgramsController {
  constructor(private readonly documentService: DocumentsService) {}

  @Post('')
  create(@Body() createDocumentDto: CreateDocumentDto): Promise<{ data: ProgramDocument }> {
    return this.documentService.create(createDocumentDto);
  }

  @Post('image/:id')
  @UseInterceptors(
    FileInterceptor('thumb', {
      storage: diskStorage({
        destination: './uploads/programs',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addFile(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<{ data: ProgramDocument }> {
    return this.documentService.addFile(id, file);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramDto: UpdateProgramDto): Promise<{ data: ProgramDocument }> {
    return this.documentService.update(id, updateProgramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.documentService.remove(id);
  }
}
