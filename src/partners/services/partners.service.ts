import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from '../dto/create-partner.dto';
import { UpdatePartnerDto } from '../dto/update-partner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Partner } from '../entities/partner.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs-extra';

@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(Partner)
    private partnerRepository: Repository<Partner>
  ) {}

  async create(dto: CreatePartnerDto): Promise<{ data: Partner }> {
    try {
      const data = await this.partnerRepository.save({
        ...dto,
        partnerships: dto.partnerships.map((id) => ({ id }))
      });
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenu sur le serveur');
    }
  }

  async findAll(): Promise<{ data: Record<string, Partner[]> }> {
    const partners = await this.partnerRepository.find({
      relations: ['partnerships']
    });

    const data = partners.reduce((acc, partner) => {
      partner.partnerships.forEach(({ name }) => {
        acc[name] = acc[name] || [];
        if (!acc[name].includes(partner)) {
          acc[name].push(partner);
        }
      });
      return acc;
    }, {});

    return { data };
  }

  async addProfile(id: string, file: Express.Multer.File) {
    try {
      const { data: partner } = await this.findOne(id);
      if (partner.profile) await fs.unlink(`./uploads/partners/${partner.profile}`);
      const data = await this.partnerRepository.save({ ...partner, profile: file.filename });
      return { data };
    } catch {
      throw new BadRequestException("Une erreur est survenue lors de l'ajout de l'image");
    }
  }

  async findOne(id: string): Promise<{ data: Partner }> {
    try {
      const data = await this.partnerRepository.findOneOrFail({
        where: { id },
        relations: ['partnerships']
      });
      return { data };
    } catch {
      throw new NotFoundException('Aucun partenaire trouver avec cet identifiant');
    }
  }

  async update(id: string, dto: UpdatePartnerDto): Promise<{ data: Partner }> {
    try {
      const { data: partner } = await this.findOne(id);
      const data = await this.partnerRepository.save({
        ...partner,
        ...dto,
        partnerships: dto.partnerships.map((id) => ({ id })) || partner.partnerships
      });
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.partnerRepository.softDelete(id);
    } catch {
      throw new BadRequestException('Une erreur est surnue lors de la suppression');
    }
  }
}
