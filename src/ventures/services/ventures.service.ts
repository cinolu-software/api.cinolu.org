import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Venture } from '../entities/venture.entity';
import { Repository } from 'typeorm';
import { CreateVentureDto } from '../dto/create-venture.dto';
import { UpdateVentureDto } from '../dto/update-venture.dto';
import * as fs from 'fs-extra';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class VenturesService {
  constructor(
    @InjectRepository(Venture)
    private ventureRepository: Repository<Venture>
  ) {}

  async create(user: User, dto: CreateVentureDto): Promise<{ data: Venture }> {
    try {
      const data = await this.ventureRepository.save({
        ...dto,
        user: { id: user.id },
        sectors: dto.sectors.map((id) => ({ id }))
      });
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async findByUser(user: User): Promise<{ data: Venture[] }> {
    try {
      const data = await this.ventureRepository.find({
        where: { user: { id: user.id } }
      });
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async findAll(): Promise<{ data: Venture[] }> {
    const data = await this.ventureRepository.find();
    return { data };
  }

  async findPublished(): Promise<{ data: Venture[] }> {
    const data = await this.ventureRepository.find({
      where: { is_published: true }
    });
    return { data };
  }

  async findOne(id: string): Promise<{ data: Venture }> {
    try {
      const data = await this.ventureRepository.findOneOrFail({
        where: { id },
        relations: ['sectors', 'user']
      });
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async addImage(id: string, file: Express.Multer.File): Promise<{ data: Venture }> {
    try {
      const { data: venture } = await this.findOne(id);
      if (venture.image) await fs.unlink(`./uploads/ventures/${venture.image}`);
      const data = await this.ventureRepository.save({ ...venture, image: file.filename });
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de la mise à jour de l'image");
    }
  }

  async publish(id: string): Promise<{ data: Venture }> {
    try {
      await this.ventureRepository.update(id, { is_published: true });
      const { data } = await this.findOne(id);
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de la publication de l'événement");
    }
  }

  async update(id: string, dto: UpdateVentureDto): Promise<{ data: Venture }> {
    try {
      const venture = await this.ventureRepository.findOneOrFail({
        where: { id }
      });

      await this.ventureRepository.save({
        id: venture.id,
        ...dto,
        sectors: dto?.sectors?.map((id) => ({ id }))
      });
      const { data } = await this.findOne(id);
      return { data };
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
