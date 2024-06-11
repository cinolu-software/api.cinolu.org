import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { AttachmentsService } from 'src/attachments/attachments.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private readonly attachmentsService: AttachmentsService
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<{ data: Project }> {
    try {
      const data = await this.projectRepository.save({
        ...createProjectDto,
        status: { id: createProjectDto.status },
        categories: createProjectDto.categories.map((id) => ({ id }))
      });
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la création du projet');
    }
  }

  async findAll(): Promise<{ data: Project[] }> {
    const data: Project[] = await this.projectRepository.find();
    return { data };
  }

  async findOne(id: number): Promise<{ data: Project }> {
    try {
      const data: Project = await this.projectRepository.findOneOrFail({
        where: { id },
        relations: ['categories', 'status', 'attachments']
      });
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la récupération du projet');
    }
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<{ data: Project }> {
    await this.findOne(id);
    try {
      const data = await this.projectRepository.save({
        id,
        ...updateProjectDto,
        status: { id: updateProjectDto.status },
        categories: updateProjectDto.categories.map((id) => ({ id }))
      });
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la modification du projet');
    }
  }

  async addAttachment(id: number, file: Express.Multer.File): Promise<{ data: Project }> {
    await this.findOne(id);
    try {
      const { data: attachment } = await this.attachmentsService.create({ name: file.filename });
      const data: Project = await this.projectRepository.save({ id, attachments: [attachment] });
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
      await this.projectRepository.delete(id);
    } catch {
      throw new BadRequestException('Erreur lors de la suppression du projet');
    }
  }
}
