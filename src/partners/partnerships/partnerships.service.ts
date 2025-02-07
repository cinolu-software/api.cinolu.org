import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnershipDto } from './dto/create-partnership.dto';
import { UpdatePartnershipDto } from './dto/update-partnership.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Partnership } from './entities/partnership.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PartnershipsService {
  constructor(
    @InjectRepository(Partnership)
    private partnershipRepository: Repository<Partnership>
  ) {}

  async create(dto: CreatePartnershipDto): Promise<Partnership> {
    try {
      return await this.partnershipRepository.save(dto);
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<Partnership[]> {
    try {
      return await this.partnershipRepository.find();
    } catch {
      throw new BadRequestException();
    }
  }

  async findOne(id: string): Promise<Partnership> {
    try {
      return await this.partnershipRepository.findOneOrFail({
        where: { id }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, dto: UpdatePartnershipDto) {
    try {
      const Partnership = await this.findOne(id);
      return await this.partnershipRepository.save({ ...Partnership, ...dto });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.partnershipRepository.softDelete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
