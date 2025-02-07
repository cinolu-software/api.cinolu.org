import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateDocumentDto } from './dto/update-document.dto';
import * as fs from 'fs-extra';
import { Document } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>
  ) {}

  async findAll(): Promise<Document[]> {
    return await this.documentRepository.find();
  }

  async create(dto: CreateDocumentDto): Promise<Document> {
    try {
      return await this.documentRepository.save({
        ...dto,
        phase: { id: dto.phase }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findOne(id: string): Promise<Document> {
    try {
      return await this.documentRepository.findOneOrFail({ where: { id } });
    } catch {
      throw new BadRequestException();
    }
  }

  async update(id: string, dto: UpdateDocumentDto): Promise<Document> {
    try {
      const document = await this.findOne(id);
      return await this.documentRepository.save({
        ...document,
        ...dto,
        phase: { id: dto?.phase ?? document.phase.id }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async addFile(id: string, file: Express.Multer.File): Promise<Document> {
    try {
      const document = await this.findOne(id);
      if (document.file_name) await fs.unlink(`./uploads/programs/documents/${document.file_name}`);
      return await this.documentRepository.save({
        ...document,
        file_name: file.filename
      });
    } catch {
      throw new BadRequestException();
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
