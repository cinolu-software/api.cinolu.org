import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVentureDto } from './dto/create-venture.dto';
import { UpdateVentureDto } from './dto/update-venture.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venture } from './entities/venture.entity';
import * as fs from 'fs-extra';
import { User } from '../../core/users/entities/user.entity';
import { FilterVenturesDto } from './dto/filter-ventures.dto';
import { GalleriesService } from '../galleries/galleries.service';

@Injectable()
export class VenturesService {
  constructor(
    @InjectRepository(Venture)
    private ventureRepository: Repository<Venture>,
    private galleriesService: GalleriesService,
  ) {}

  async create(user: User, dto: CreateVentureDto): Promise<Venture> {
    try {
      return await this.ventureRepository.save({
        ...dto,
        owner: { id: user.id }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findBySlug(slug: string): Promise<Venture> {
    try {
      return await this.ventureRepository.findOneOrFail({
        where: { slug }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async togglePublish(slug: string): Promise<Venture> {
    const venture = await this.findBySlug(slug);
    venture.is_published = !venture.is_published;
    return await this.ventureRepository.save(venture);
  }

  async findByUser(page: string, user: User): Promise<[Venture[], number]> {
    try {
      return await this.ventureRepository.findAndCount({
        where: { owner: { id: user.id } },
        skip: ((+page || 1) - 1) * 12,
        take: 12,
        order: { created_at: 'DESC' }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async addImages(id: string, file: Express.Multer.File): Promise<Venture> {
    try {
      const venture = await this.findOne(id);
      const image = await this.galleriesService.uploadImage(file);
      return await this.ventureRepository.save({
        ...venture,
        gallery: [...venture.gallery, image]
      });
    } catch {
      throw new BadRequestException();
    }
  }


  async findAll(queryParams: FilterVenturesDto): Promise<[Venture[], number]> {
    const { page = 1, q } = queryParams;
    const take = 40;
    const skip = (+page - 1) * take;
    const query = this.ventureRepository.createQueryBuilder('venture');
    if (q) query.where('venture.name LIKE :q OR venture.description LIKE :q', { q: `%${q}%` });
    return await query.orderBy('venture.created_at', 'DESC').skip(skip).take(take).getManyAndCount();
  }

  async findOne(id: string): Promise<Venture> {
    try {
      return await this.ventureRepository.findOneOrFail({
        where: { id }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(slug: string, dto: UpdateVentureDto): Promise<Venture> {
    try {
      const venture = await this.findBySlug(slug);
      return await this.ventureRepository.save({ ...venture, ...dto });
    } catch {
      throw new BadRequestException();
    }
  }

  async addLogo(id: string, file: Express.Multer.File): Promise<Venture> {
    try {
      const venture = await this.findOne(id);
      if (venture.logo) await fs.unlink(`./uploads/ventures/logos/${venture.logo}`);
      return await this.ventureRepository.save({ ...venture, logo: file.filename });
    } catch {
      throw new BadRequestException();
    }
  }

  async addCover(id: string, file: Express.Multer.File): Promise<Venture> {
    try {
      const venture = await this.findOne(id);
      if (venture.cover) await fs.unlink(`./uploads/ventures/covers/${venture.cover}`);
      return await this.ventureRepository.save({ ...venture, cover: file.filename });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.ventureRepository.softDelete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
