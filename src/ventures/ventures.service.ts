import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Venture } from './entities/venture.entity';
import { Repository } from 'typeorm';
import { CreateVentureDto } from './dto/create-venture.dto';
import { UpdateVentureDto } from './dto/update-venture.dto';
import * as fs from 'fs-extra';
import { User } from '../users/entities/user.entity';

@Injectable()
export class VenturesService {
  constructor(
    @InjectRepository(Venture)
    private ventureRepository: Repository<Venture>
  ) {}

  async create(user: User, dto: CreateVentureDto): Promise<Venture> {
    try {
      return await this.ventureRepository.save({
        ...dto,
        user: { id: user.id },
        sectors: dto.sectors.map((id) => ({ id }))
      });
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async findByUser(user: User): Promise<Venture[]> {
    try {
      return await this.ventureRepository.find({
        where: { user: { id: user.id } }
      });
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async findAll(): Promise<Venture[]> {
    return await this.ventureRepository.find();
  }

  async findPublished(): Promise<Venture[]> {
    return await this.ventureRepository.find({
      where: { is_published: true }
    });
  }

  async findOne(id: string): Promise<Venture> {
    try {
      return await this.ventureRepository.findOneOrFail({
        where: { id },
        relations: ['sectors', 'user']
      });
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async addImage(id: string, file: Express.Multer.File): Promise<Venture> {
    try {
      const venture = await this.findOne(id);
      if (venture.image) await fs.unlink(`./uploads/ventures/${venture.image}`);
      return await this.ventureRepository.save({ ...venture, image: file.filename });
    } catch {
      throw new BadRequestException("Erreur lors de la mise à jour de l'image");
    }
  }

  async publish(id: string): Promise<Venture> {
    try {
      await this.ventureRepository.update(id, { is_published: true });
      return await this.findOne(id);
    } catch {
      throw new BadRequestException("Erreur lors de la publication de l'événement");
    }
  }

  async update(id: string, dto: UpdateVentureDto): Promise<Venture> {
    try {
      const venture = await this.ventureRepository.findOneOrFail({
        where: { id }
      });
      return await this.ventureRepository.save({
        id: venture.id,
        ...dto,
        sectors: dto?.sectors?.map((id) => ({ id }))
      });
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.ventureRepository.softDelete(id);
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }
}
