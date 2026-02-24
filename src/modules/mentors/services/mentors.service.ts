import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MentorRequestDto } from '../dto/mentor-request.dto';
import { UpdateMentorRequestDto } from '../dto/update-mentor-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MentorProfile } from '../entities/mentor.entity';
import { User } from '../../users/entities/user.entity';
import { FilterMentorsDto } from '../dto/filter-mentors.dto';
import { UsersService } from '../../users/services/users.service';
import { MentorStatus } from '../enums/mentor.enum';
import { MentorExperiencesService } from './mentor-experiences.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Role } from '@/core/auth/enums/roles.enum';
import { CreateMentorDto } from '../dto/create-mentor.dto';
import { UpdateMentorDto } from '../dto/update-mentor.dto';

@Injectable()
export class MentorsService {
  constructor(
    @InjectRepository(MentorProfile)
    private mentorRepository: Repository<MentorProfile>,
    private usersService: UsersService,
    private experiencesService: MentorExperiencesService,
    private eventEmitter: EventEmitter2
  ) {}

  async submitRequest(user: User, dto: MentorRequestDto): Promise<MentorProfile> {
    try {
      const savedProfile = await this.createProfile(user.id, dto, MentorStatus.PENDING);
      this.eventEmitter.emit('mentor.application', savedProfile);
      return savedProfile;
    } catch {
      throw new BadRequestException('Erreur lors de la création du profil de mentor');
    }
  }

  async updateRequest(mentorId: string, dto: UpdateMentorRequestDto): Promise<MentorProfile> {
    try {
      const mentorProfile = await this.findOne(mentorId);
      if (dto.experiences) {
        await this.experiencesService.saveExperiences(mentorId, dto.experiences);
      }
      await this.mentorRepository.save({
        ...mentorProfile,
        ...dto,
        expertises: dto?.expertises?.map((id) => ({ id })) || mentorProfile.expertises
      });
      return await this.findOne(mentorId);
    } catch {
      throw new BadRequestException('Erreur lors de la mise a jour');
    }
  }

  async findByPhase(phaseId: string): Promise<MentorProfile[]> {
    return this.mentorRepository.find({
      where: { phases: { id: phaseId } }
    });
  }

  async create(dto: CreateMentorDto): Promise<MentorProfile> {
    try {
      const user = await this.usersService.findOrCreate(dto.user);
      const mentorProfile = await this.createProfile(user.id, dto.mentor, MentorStatus.APPROVED);
      await this.usersService.assignRole(user.id, Role.MENTOR);
      this.eventEmitter.emit('mentor.approved', mentorProfile);
      return mentorProfile;
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Erreur lors de la création du profil mentor approuvé');
    }
  }

  async updateMentor(mentorId: string, dto: UpdateMentorDto): Promise<MentorProfile> {
    try {
      const mentorProfile = await this.findOne(mentorId);
      await this.experiencesService.saveExperiences(mentorId, dto.mentor.experiences);
      await this.usersService.update(mentorProfile.owner.id, dto.user);
      await this.mentorRepository.save({
        ...mentorProfile,
        ...dto.mentor,
        expertises: dto.mentor.expertises?.map((id) => ({ id })) || mentorProfile.expertises
      });
      return await this.findOne(mentorId);
    } catch {
      throw new BadRequestException('Erreur lors de la mise à jour du mentor');
    }
  }

  async findFiltered(dto: FilterMentorsDto): Promise<[MentorProfile[], number]> {
    try {
      const { q, page, status } = dto;
      const query = this.mentorRepository
        .createQueryBuilder('m')
        .leftJoinAndSelect('m.owner', 'owner')
        .leftJoinAndSelect('m.expertises', 'expertises');
      if (q) query.andWhere('owner.name LIKE :search', { search: `%${q}%` });
      if (status) query.andWhere('m.status = :status', { status });
      if (page) query.skip((+page - 1) * 10).take(10);
      return await query.getManyAndCount();
    } catch {
      throw new BadRequestException();
    }
  }

  async findApproved(): Promise<MentorProfile[]> {
    try {
      return await this.mentorRepository.find({
        where: { status: MentorStatus.APPROVED },
        relations: ['owner', 'experiences', 'expertises']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async approve(id: string): Promise<MentorProfile> {
    try {
      const mentorProfile = await this.findOne(id);
      await this.mentorRepository.update(id, { status: MentorStatus.APPROVED });
      await this.usersService.assignRole(mentorProfile.owner.id, Role.MENTOR);
      const updatedProfile = await this.findOne(id);
      this.eventEmitter.emit('mentor.approved', updatedProfile);
      return updatedProfile;
    } catch {
      throw new BadRequestException();
    }
  }

  async reject(id: string): Promise<MentorProfile> {
    try {
      const mentorProfile = await this.findOne(id);
      await this.mentorRepository.update(id, { status: MentorStatus.REJECTED });
      await this.usersService.assignRole(mentorProfile.owner.id, Role.USER);
      const updatedProfile = await this.findOne(id);
      this.eventEmitter.emit('mentor.rejected', updatedProfile);
      return updatedProfile;
    } catch {
      throw new BadRequestException();
    }
  }

  async findByUser(user: User): Promise<MentorProfile[]> {
    try {
      return await this.mentorRepository.find({
        where: { owner: { id: user.id } },
        relations: ['experiences', 'expertises']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async findOne(id: string): Promise<MentorProfile> {
    try {
      return await this.mentorRepository.findOneOrFail({
        where: { id },
        relations: ['experiences', 'expertises', 'owner']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, dto: UpdateMentorRequestDto): Promise<MentorProfile> {
    try {
      const mentorProfile = await this.findOne(id);
      if (dto.experiences) {
        await this.experiencesService.saveExperiences(id, dto.experiences);
      }
      return await this.mentorRepository.save({
        ...mentorProfile,
        ...dto,
        expertises: dto?.expertises?.map((id) => ({ id })) || mentorProfile.expertises
      });
    } catch {
      throw new BadRequestException('Erreur lors de la mise à jour du profil de mentor');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.mentorRepository.softDelete(id);
    } catch {
      throw new BadRequestException();
    }
  }

  async addCv(id: string, cv: string): Promise<MentorProfile> {
    try {
      const mentor = await this.findOne(id);
      mentor.cv = cv;
      return await this.mentorRepository.save(mentor);
    } catch {
      throw new BadRequestException();
    }
  }

  private async createProfile(userId: string, dto: MentorRequestDto, status: MentorStatus): Promise<MentorProfile> {
    try {
      const mentorProfile = await this.mentorRepository.save({
        ...dto,
        status,
        owner: { id: userId },
        expertises: dto.expertises ? dto.expertises.map((id) => ({ id })) : []
      });
      if (dto.experiences?.length) {
        await this.experiencesService.saveExperiences(mentorProfile.id, dto.experiences);
      }
      return await this.findOne(mentorProfile.id);
    } catch {
      throw new BadRequestException();
    }
  }
}
