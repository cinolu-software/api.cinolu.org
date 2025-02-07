import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Partner } from './entities/partner.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs-extra';

@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(Partner)
    private partnerRepository: Repository<Partner>
  ) {}

  async create(dto: CreatePartnerDto): Promise<Partner> {
    try {
      return await this.partnerRepository.save({
        ...dto,
        partnerships: dto.partnerships.map((id) => ({ id }))
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findGrouped(): Promise<Record<string, Partner[]>> {
    const partners = await this.partnerRepository.find({
      relations: ['partnerships']
    });
    return partners.reduce((acc, partner) => {
      partner.partnerships.forEach(({ name }) => {
        acc[name] = acc[name] || [];
        if (!acc[name].includes(partner)) {
          acc[name].push(partner);
        }
      });
      return acc;
    }, {});
  }

  async findAll(): Promise<Partner[]> {
    return await this.partnerRepository.find({
      relations: ['partnerships']
    });
  }

  async addProfile(id: string, file: Express.Multer.File) {
    try {
      const partner = await this.findOne(id);
      if (partner.profile) await fs.unlink(`./uploads/partners/${partner.profile}`);
      return await this.partnerRepository.save({ ...partner, profile: file.filename });
    } catch {
      throw new BadRequestException();
    }
  }

  async findOne(id: string): Promise<Partner> {
    try {
      return await this.partnerRepository.findOneOrFail({
        where: { id },
        relations: ['partnerships']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, dto: UpdatePartnerDto): Promise<Partner> {
    try {
      const partner = await this.findOne(id);
      return await this.partnerRepository.save({
        ...partner,
        ...dto,
        partnerships: dto.partnerships.map((id) => ({ id })) || partner.partnerships
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.partnerRepository.softDelete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
