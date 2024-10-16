import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { Repository } from 'typeorm';
import { AttachmentsService } from 'src/modules/utilities/attachments/attachments.service';
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
      const { data: requirements } = await this.requirementService.createMany(dto.requirements);
      const data = await this.programRepository.save({
        ...dto,
        requirements,
        types: dto.types.map((type) => ({ id: type })),
        partners: dto.partners.map((id) => ({ id }))
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

  async findAll(page: number, type: string): Promise<{ data: { programs: Program[]; count: number } }> {
    const take: number = 9;
    const skip = (page - 1) * take;
    const where = type ? { types: { name: type } } : {};
    const programs: Program[] = await this.programRepository.find({
      skip,
      take,
      where,
      order: { start_at: 'DESC' },
      relations: ['types']
    });
    const count = await this.programRepository.count();
    return { data: { programs, count } };
  }

  async findOne(id: string): Promise<{ data: Program }> {
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

  async update(id: string, dto: UpdateProgramDto): Promise<{ data: Program }> {
    try {
      const { data: program } = await this.findOne(id);

      const data = await this.programRepository.save({
        id,
        ...dto,
        types: dto.types.map((type) => ({ id: type })) || program.types,
        requirements: dto.requirements || program.requirements,
        partners: dto.partners?.map((id) => ({ id })) || program.partners
      });
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la modification du programme');
    }
  }

  async addAttachment(id: string, file: Express.Multer.File): Promise<{ data: Program }> {
    await this.findOne(id);
    try {
      const { data: attachment } = await this.attachmentsService.create({ name: file.filename });
      const data = await this.programRepository.save({ id, attachments: [attachment] });
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de l'ajout de la pièce jointe");
    }
  }

  async removeAttachment(id: string): Promise<void> {
    try {
      await this.attachmentsService.remove(id);
    } catch {
      throw new BadRequestException('Erreur lors de la suppression de la pièce jointe');
    }
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    try {
      await this.programRepository.delete(id);
    } catch {
      throw new BadRequestException('Erreur lors de la suppression du programme');
    }
  }
}
