import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs-extra';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>
  ) {}

  async create(dto: CreateOrganizationDto): Promise<Organization> {
    try {
      return await this.organizationRepository.save(dto);
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<Organization[]> {
    return await this.organizationRepository.find({
      relations: ['categories']
    });
  }

  async approve(id: string): Promise<Organization> {
    try {
      const organization = await this.organizationRepository.findOneOrFail({
        where: { id }
      });
      return await this.organizationRepository.save({ ...organization, approved: true });
    } catch {
      throw new BadRequestException();
    }
  }

  async reject(id: string): Promise<Organization> {
    try {
      const organization = await this.organizationRepository.findOneOrFail({
        where: { id }
      });
      return await this.organizationRepository.save({ ...organization, approved: false });
    } catch {
      throw new BadRequestException();
    }
  }

  async getCategoryCounts(): Promise<{ category: string; count: number }[]> {
    const query = this.organizationRepository
      .createQueryBuilder('org')
      .leftJoin('org.categories', 'cat')
      .where('org.is_approved = true')
      .select('cat.name', 'category')
      .addSelect('COUNT(org.id)', 'count')
      .orderBy('count', 'DESC');
    const total = await query.getCount();
    const results = await query.groupBy('cat.name').getRawMany();
    results.unshift({ category: 'Total', count: total });
    return results.map((result) => ({
      category: result.category,
      count: parseInt(result.count, 0)
    }));
  }

  async findByCategory(category: string): Promise<Organization[]> {
    try {
      return await this.organizationRepository.find({
        where: {
          categories: { name: category }
        },
        relations: ['categories']
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findOne(id: string): Promise<Organization> {
    try {
      return await this.organizationRepository.findOneOrFail({
        where: { id }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async addLogo(id: string, file: Express.Multer.File): Promise<Organization> {
    try {
      const organization = await this.findOne(id);
      if (organization.logo) await fs.unlink(`./uploads/organizations/${organization.logo}`);
      return await this.organizationRepository.save({ ...organization, logo: file.filename });
    } catch {
      throw new BadRequestException();
    }
  }

  async update(id: string, dto: UpdateOrganizationDto): Promise<Organization> {
    try {
      const organization = await this.findOne(id);
      return await this.organizationRepository.save({ ...organization, ...dto });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.organizationRepository.softDelete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
