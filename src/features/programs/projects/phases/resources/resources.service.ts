import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { promises as fs } from 'fs';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>
  ) {}

  async create(dto: CreateResourceDto): Promise<Resource> {
    try {
      const resourceData: Record<string, unknown> = { ...dto };
      if (dto.phase) resourceData.phase = { id: dto.phase };
      if (dto.project) resourceData.project = { id: dto.project };
      const resource = this.resourceRepository.create(resourceData);
      return await this.resourceRepository.save(resource);
    } catch {
      throw new BadRequestException();
    }
  }

  async createWithFile(dto: Omit<CreateResourceDto, 'url'>, file: Express.Multer.File): Promise<Resource> {
    try {
      return await this.create({
        ...dto,
        url: file.filename
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<Resource[]> {
    try {
      return await this.resourceRepository.find({
        relations: ['phase', 'project']
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findByPhase(phaseId: string): Promise<Resource[]> {
    try {
      return await this.resourceRepository.find({
        where: { phase: { id: phaseId } },
        order: { created_at: 'DESC' }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findByProject(projectId: string): Promise<Resource[]> {
    try {
      return await this.resourceRepository.find({
        where: { project: { id: projectId } },
        order: { created_at: 'DESC' }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findOne(id: string): Promise<Resource> {
    try {
      return await this.resourceRepository.findOneOrFail({
        where: { id },
        relations: ['phase', 'project']
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async update(id: string, dto: UpdateResourceDto): Promise<Resource> {
    try {
      const resource = await this.findOne(id);
      const updateData: Record<string, unknown> = { ...dto };
      if (dto.phase) updateData.phase = { id: dto.phase };
      if (dto.project) updateData.project = { id: dto.project };
      Object.assign(resource, updateData);
      return await this.resourceRepository.save(resource);
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const resource = await this.findOne(id);
      if (!resource.url.startsWith('http')) await fs.unlink(`./uploads/projects/resources/${resource.url}`);
      await this.resourceRepository.softRemove(resource);
    } catch {
      throw new BadRequestException();
    }
  }
}
