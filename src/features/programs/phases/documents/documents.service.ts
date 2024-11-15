import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import * as fs from 'fs-extra';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>
  ) {}

  async findAll(): Promise<{ data: Document[] }> {
    const data = await this.documentRepository.find();
    return { data };
  }

  async create(dto: CreateDocumentDto): Promise<{ data: Document }> {
    try {
      const data = await this.documentRepository.save({
        ...dto,
        phase: { id: dto.phase }
      });
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de l'ajout du document");
    }
  }

  async findOne(id: string): Promise<Document> {
    try {
      const document = await this.documentRepository.findOneOrFail({ where: { id } });
      return document;
    } catch {
      throw new BadRequestException('Erreur lors de la lecture du document');
    }
  }

  async update(id: string, dto: UpdateDocumentDto): Promise<{ data: Document }> {
    try {
      const document = await this.findOne(id);
      const data = await this.documentRepository.save({
        ...document,
        ...dto,
        phase: { id: dto?.phase ?? document.phase.id }
      });
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la mise à jour du document');
    }
  }

  async addFile(id: string, file: Express.Multer.File): Promise<{ data: Document }> {
    try {
      const document = await this.findOne(id);
      if (document.file_name) await fs.promises.unlink(`./uploads/programs/documents/${document.file_name}`);
      const data = await this.documentRepository.save({
        ...document,
        file_name: file.filename
      });
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de l'ajout du fichier au document");
    }
  }

  async removeFile(id: string): Promise<{ data: Document }> {
    try {
      const document = await this.findOne(id);
      if (document.file_name) await fs.promises.unlink(`./uploads/programs/documents/${document.file_name}`);
      const data = await this.documentRepository.save({
        ...document,
        file_name: null
      });
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de l'ajout du fichier au document");
    }
  }

  async restore(id: string): Promise<{ data: Document }> {
    try {
      const res = await this.documentRepository.restore(id);
      if (!res.affected) throw new BadRequestException();
      const data = await this.findOne(id);
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la restauration du document');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.documentRepository.softDelete(id);
    } catch {
      throw new BadRequestException('Erreur survenue lors de la suppression du document');
    }
  }
}
