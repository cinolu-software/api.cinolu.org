import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { promises as fs } from 'fs';
import { Venture } from './entities/venture.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Gallery } from '@/modules/galleries/entities/gallery.entity';
import { CreateVentureDto } from './dto/create-venture.dto';
import { UpdateVentureDto } from './dto/update-venture.dto';
import { FilterVenturesDto } from './dto/filter-ventures.dto';
import { GalleriesService } from '@/modules/galleries/galleries.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class VenturesService {
  constructor(
    @InjectRepository(Venture)
    private ventureRepository: Repository<Venture>,
    private galleryService: GalleriesService,
    private eventEmitter: EventEmitter2
  ) {}

  async create(user: User, dto: CreateVentureDto): Promise<Venture> {
    try {
      const savedVenture = await this.ventureRepository.save({
        ...dto,
        owner: { id: user.id }
      });
      const venture = await this.findOne(savedVenture.id);
      this.eventEmitter.emit('venture.created', venture);
      return venture;
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
        relations: ['gallery', 'products', 'products.gallery', 'owner', 'documents']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async togglePublish(slug: string): Promise<Venture> {
    const venture = await this.findBySlug(slug);
    const updatedVenture = await this.ventureRepository.save({ ...venture, is_published: !venture.is_published });
    if (updatedVenture.is_published) this.eventEmitter.emit('venture.approved', updatedVenture);
    if (!updatedVenture.is_published) this.eventEmitter.emit('venture.rejected', updatedVenture);
    return updatedVenture;
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
    const query = this.ventureRepository.createQueryBuilder('venture').leftJoinAndSelect('venture.owner', 'owner');
    if (q) query.where('venture.name LIKE :q OR venture.description LIKE :q', { q: `%${q}%` });
    return await query.orderBy('venture.created_at', 'DESC').skip(skip).take(take).getManyAndCount();
  }

  async findOne(id: string): Promise<Venture> {
    try {
      return await this.ventureRepository.findOneOrFail({
        where: { id },
        relations: ['gallery', 'owner']
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
      if (venture.logo) await fs.unlink(`./uploads/ventures/logos/${venture.logo}`);
      venture.logo = file.filename;
      return await this.ventureRepository.save(venture);
    } catch {
      throw new BadRequestException();
    }
  }

  async addCover(id: string, file: Express.Multer.File): Promise<Venture> {
    try {
      const venture = await this.findOne(id);
      if (venture.cover) await fs.unlink(`./uploads/ventures/covers/${venture.cover}`);
      venture.cover = file.filename;
      return await this.ventureRepository.save(venture);
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
