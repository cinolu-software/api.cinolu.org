import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enterprise } from './entities/enterprise.entity';
import * as fs from 'fs-extra';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class EnterprisesService {
  constructor(
    @InjectRepository(Enterprise)
    private enterpriseRepository: Repository<Enterprise>
  ) {}

  async create(user: User, dto: CreateEnterpriseDto): Promise<Enterprise> {
    try {
      return await this.enterpriseRepository.save({
        ...dto,
        owner: { id: user.id }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findBySlug(slug: string): Promise<Enterprise> {
    try {
      return await this.enterpriseRepository.findOneOrFail({
        where: { slug },
        relations: ['products']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async findByUser(page: string, user: User): Promise<[Enterprise[], number]> {
    try {
      return await this.enterpriseRepository.findAndCount({
        where: {
          owner: { id: user.id }
        },
        skip: (Number(page || 1) - 1) * 10,
        take: 10,
        order: { created_at: 'DESC' }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async findOne(id: string): Promise<Enterprise> {
    try {
      return await this.enterpriseRepository.findOneOrFail({
        where: { id }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(slug: string, dto: UpdateEnterpriseDto): Promise<Enterprise> {
    try {
      const enterprise = await this.findBySlug(slug);
      return await this.enterpriseRepository.save({
        ...enterprise,
        ...dto
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async addLogo(id: string, file: Express.Multer.File): Promise<Enterprise> {
    try {
      const enterprise = await this.findOne(id);
      if (enterprise.logo) await fs.unlink(`./uploads/enterprises/logos/${enterprise.logo}`);
      return await this.enterpriseRepository.save({ ...enterprise, logo: file.filename });
    } catch {
      throw new BadRequestException();
    }
  }

  async addCover(id: string, file: Express.Multer.File): Promise<Enterprise> {
    try {
      const enterprise = await this.findOne(id);
      if (enterprise.cover) await fs.unlink(`./uploads/enterprises/covers/${enterprise.cover}`);
      return await this.enterpriseRepository.save({ ...enterprise, cover: file.filename });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.enterpriseRepository.softDelete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
