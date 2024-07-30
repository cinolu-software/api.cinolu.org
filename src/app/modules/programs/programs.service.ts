import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { Repository } from 'typeorm';
import { AttachmentsService } from 'src/app/modules/attachments/attachments.service';
import { RequirementsService } from '../requirements/requirements.service';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private programRepository: Repository<Program>,
    private requirementService: RequirementsService,
    private attachmentsService: AttachmentsService
  ) {}

  async create(dto: CreateProgramDto): Promise<{ data: Program }> {
    try {
      await this.throwIfExist(dto.name);
      await this.requirementService.createMany(dto.requirements);
      const data: Program = await this.programRepository.save({
        ...dto,
        types: dto.types.map((type) => ({ id: type }))
      });
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la création du programme');
    }
  }

  async throwIfExist(name: string): Promise<void> {
    const program = await this.programRepository.findOne({
      where: { name }
    });
    if (program) throw new BadRequestException('Le programme existe déjà');
  }

  async findAll(): Promise<{ data: Program[] }> {
    const data: Program[] = await this.programRepository.find({
      relations: ['attachments', 'types']
    });
    return { data };
  }

  async findOne(id: number): Promise<{ data: Program }> {
    try {
      const data: Program = await this.programRepository.findOneOrFail({
        where: { id },
        relations: ['attachments', 'requirements', 'types']
      });
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la récupération du programme');
    }
  }

  async update(id: number, updateProgramDto: UpdateProgramDto): Promise<{ data: Program }> {
    await this.findOne(id);
    try {
      const data = await this.programRepository.save({
        id,
        ...updateProgramDto,
        types: updateProgramDto.types.map((type) => ({ id: type })),
        requirements: updateProgramDto.requirements
      });
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la modification du programme');
    }
  }

  async addAttachment(id: number, file: Express.Multer.File): Promise<{ data: Program }> {
    await this.findOne(id);
    try {
      const { data: attachment } = await this.attachmentsService.create({ name: file.filename });
      const data = await this.programRepository.save({ id, attachments: [attachment] });
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de l'ajout de la pièce jointe");
    }
  }

  async removeAttachment(id: number): Promise<void> {
    try {
      await this.attachmentsService.remove(id);
    } catch {
      throw new BadRequestException('Erreur lors de la suppression de la pièce jointe');
    }
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    try {
      await this.programRepository.delete(id);
    } catch {
      throw new BadRequestException('Erreur lors de la suppression du programme');
    }
  }
}
