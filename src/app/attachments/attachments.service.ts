import { BadRequestException, Injectable } from '@nestjs/common';
import { Attachment } from './entities/attachment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { CreateAttachmentDto } from './dto/create-attachment.dto';

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectRepository(Attachment)
    private attachmentRepository: Repository<Attachment>
  ) {}

  async create(createAttachmentDto: CreateAttachmentDto): Promise<{ data: Attachment }> {
    try {
      const data: Attachment = await this.attachmentRepository.save(createAttachmentDto);
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la création de la pièce jointe');
    }
  }

  async findOne(id: number): Promise<{ data: Attachment }> {
    try {
      const data: Attachment = await this.attachmentRepository.findOneOrFail({ where: { id } });
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la récupération de la pièce jointe');
    }
  }

  async remove(id: number) {
    const { data } = await this.findOne(id);
    try {
      await fs.promises.unlink(`./uploads/attachments/${data.name}`);
      await this.attachmentRepository.delete(id);
    } catch {
      throw new BadRequestException('Erreur lors de la suppression de la pièce jointe');
    }
  }
}
