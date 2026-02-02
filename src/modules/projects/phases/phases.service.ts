import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhaseDto } from './dto/create-phase.dto';
import { UpdatePhaseDto } from './dto/update-phase.dto';
import { GroupUsersPhaseDto } from './dto/group-users-phase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Phase } from './entities/phase.entity';
import { UsersService } from '@/modules/users/users.service';

@Injectable()
export class PhasesService {
  constructor(
    @InjectRepository(Phase)
    private readonly phaseRepository: Repository<Phase>,
    private readonly usersService: UsersService
  ) {}

  async create(dto: CreatePhaseDto): Promise<Phase> {
    try {
      return await this.phaseRepository.save(dto);
    } catch {
      throw new BadRequestException();
    }
  }

  async groupParticipants(dto: GroupUsersPhaseDto): Promise<Phase> {
    try {
      const phase = await this.phaseRepository.findOneOrFail({
        where: { id: dto.phaseId },
        relations: ['participants']
      });
      const users = await this.usersService.findByIds(dto.ids);
      return await this.phaseRepository.save({
        ...phase,
        participants: users
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findBySlug(slug: string): Promise<Phase> {
    try {
      return await this.phaseRepository.findOneOrFail({
        where: { slug },
        relations: ['participants']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async findOne(id: string): Promise<Phase> {
    try {
      return await this.phaseRepository.findOneOrFail({ where: { id } });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, updatePhaseDto: UpdatePhaseDto): Promise<Phase> {
    try {
      return await this.phaseRepository.save({ ...updatePhaseDto, id });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.phaseRepository.delete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
