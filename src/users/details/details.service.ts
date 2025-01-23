import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDetailDto } from './dto/create-detail.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Detail } from './entities/detail.entity';

@Injectable()
export class DetailsService {
  constructor(
    @InjectRepository(Detail)
    private readonly detailRepository: Repository<Detail>
  ) {}

  async create(dto: CreateDetailDto): Promise<{ data: Detail }> {
    try {
      const data: Detail = await this.detailRepository.save({
        ...dto,
        expertises: dto?.expertises?.map((id) => ({ id })),
        positions: dto?.positions?.map((id) => ({ id }))
      });
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la création du rôle');
    }
  }
}
