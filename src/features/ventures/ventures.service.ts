import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { promises as fs } from 'fs';
import { Venture } from './entities/venture.entity';
import { User } from '../../core/users/entities/user.entity';
import { Gallery } from '../galleries/entities/gallery.entity';
import { CreateVentureDto } from './dto/create-venture.dto';
import { UpdateVentureDto } from './dto/update-venture.dto';
import { FilterVenturesDto } from './dto/filter-ventures.dto';
import { GalleriesService } from '../galleries/galleries.service';

@Injectable()
export class VenturesService {
  constructor(
    @InjectRepository(Venture)
    private readonly ventureRepository: Repository<Venture>,
    private readonly galleryService: GalleriesService
  ) {}

  async create(user: User, dto: CreateVentureDto): Promise<Venture> {
    try {
      const venture = this.ventureRepository.create({
        ...dto,
        owner: { id: user.id }
      });
      return await this.ventureRepository.save(venture);
    } catch {
      throw new BadRequestException();
    }
  }

  async addGallery(id: string, file: Express.Multer.File): Promise<void> {
    try {
      await this.findOne(id);
      const galleryDto = {
        image: file.filename,
        venture: { id }
      };
      await this.galleryService.create(galleryDto);
    } catch {
      throw new BadRequestException();
    }
  }

  async removeGallery(id: string): Promise<void> {
    try {
      await this.galleryService.remove(id);
    } catch {
      throw new BadRequestException();
    }
  }

  async findPublished(): Promise<Venture[]> {
    return await this.ventureRepository.find({
      where: { is_published: true },
      relations: ['gallery', 'products', 'owner']
    });
  }

  async findGallery(slug: string): Promise<Gallery[]> {
    const venture = await this.findBySlug(slug);
    return venture.gallery;
  }

  async findBySlug(slug: string): Promise<Venture> {
    try {
      return await this.ventureRepository.findOneOrFail({
        where: { slug },
        relations: ['gallery', 'products', 'products.gallery', 'owner']
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
    const skip = (+(page || 1) - 1) * 40;
    try {
      return await this.ventureRepository.findAndCount({
        where: { owner: { id: user.id } },
        skip,
        take: 40,
        order: { created_at: 'DESC' }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async findByUserUnpaginated(user: User): Promise<Venture[]> {
    try {
      return await this.ventureRepository.find({
        where: { owner: { id: user.id } },
        order: { created_at: 'DESC' }
      });
    } catch {
      throw new NotFoundException();
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
        where: { id },
        relations: ['gallery']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(slug: string, dto: UpdateVentureDto): Promise<Venture> {
    try {
      const venture = await this.findBySlug(slug);
      Object.assign(venture, dto);
      return await this.ventureRepository.save(venture);
    } catch {
      throw new BadRequestException();
    }
  }

  async addLogo(id: string, file: Express.Multer.File): Promise<Venture> {
    try {
      const venture = await this.findOne(id);
      await this.removeOldFile(venture.logo, './uploads/ventures/logos');
      venture.logo = file.filename;
      return await this.ventureRepository.save(venture);
    } catch {
      throw new BadRequestException();
    }
  }

  async addCover(id: string, file: Express.Multer.File): Promise<Venture> {
    try {
      const venture = await this.findOne(id);
      await this.removeOldFile(venture.cover, './uploads/ventures/covers');
      venture.cover = file.filename;
      return await this.ventureRepository.save(venture);
    } catch {
      throw new BadRequestException();
    }
  }

  private async removeOldFile(filename: string | undefined, path: string): Promise<void> {
    try {
      await fs.unlink(`${path}/${filename}`);
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const venture = await this.findOne(id);
      await this.ventureRepository.softDelete(venture.id);
    } catch {
      throw new BadRequestException();
    }
  }
}
