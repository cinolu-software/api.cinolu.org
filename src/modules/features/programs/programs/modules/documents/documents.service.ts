import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProgramDocument } from './entities/document.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(ProgramDocument)
    private documentsRepository: Repository<ProgramDocument>
  ) {}

  async create(dto: CreateDocumentDto): Promise<{ data: ProgramDocument }> {
    try {
      const data = await this.documentsRepository.save({
        ...dto,
        program: { id: dto.program }
      });
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de l'ajout du document");
    }
  }

  async findOne(id: string): Promise<ProgramDocument> {
    try {
      const document = await this.documentsRepository.findOneOrFail({ where: { id } });
      return document;
    } catch {
      throw new BadRequestException('Erreur lors de la lecture du document');
    }
  }

  async update(id: string, dto: UpdateDocumentDto): Promise<{ data: ProgramDocument }> {
    try {
      const document = await this.findOne(id);
      const data = await this.documentsRepository.save({
        ...document,
        ...dto,
        program: { id: dto.program }
      });
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la mise à jour du document');
    }
  }

  async addFile(documentId: string, file: Express.Multer.File): Promise<{ data: ProgramDocument }> {
    try {
      const document = await this.findOne(documentId);
      const data = await this.documentsRepository.save({
        ...document,
        file_path: file.filename
      });
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de l'ajout du fichier au document");
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.documentsRepository.softDelete(id);
    } catch {
      throw new BadRequestException('Erreur survenue lors de la suppression du document');
    }
  }
}
