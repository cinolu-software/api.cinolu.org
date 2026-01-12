import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMentorProfileDto } from './dto/create-mentor-profile.dto';
import { UpdateMentorProfileDto } from './dto/update-mentor-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MentorProfile } from './entities/mentor-profile.entity';
import { User } from '../users/entities/user.entity';
import { promises as fs } from 'fs';
import { FilterMentorsProfileDto } from './dto/filter-mentors-profiles.dto';
import { UsersService } from '../users/users.service';
import { MentorStatus } from './enums/mentor.enum';
import { ExperiencesService } from './experiences.service';
import { Role } from '@/core/auth/enums/roles.enum';

@Injectable()
export class MentorProfilesService {
  constructor(
    @InjectRepository(MentorProfile)
    private mentorProfileRepository: Repository<MentorProfile>,
    private usersService: UsersService,
    private experiencesService: ExperiencesService
  ) {}

  async create(user: User, dto: CreateMentorProfileDto): Promise<MentorProfile> {
    try {
      const mentorProfile = await this.mentorProfileRepository.save({
        ...dto,
        owner: { id: user.id },
        expertises: dto.expertises ? dto.expertises.map((id) => ({ id })) : []
      });
      if (dto.experiences?.length) {
        await this.experiencesService.saveExperiences(mentorProfile.id, dto.experiences);
      }
      return await this.findOne(mentorProfile.id);
    } catch {
      throw new BadRequestException('Erreur lors de la création du profil de mentor');
    }
  }

  async addCv(id: string, file: Express.Multer.File): Promise<MentorProfile> {
    try {
      const mentor = await this.findOne(id);
      if (mentor.cv) await fs.unlink(`./uploads/mentors/cvs/${mentor.cv}`);
      mentor.cv = file.filename;
      return await this.mentorProfileRepository.save(mentor);
    } catch {
      throw new BadRequestException();
    }
  }

  async findFiltered(dto: FilterMentorsProfileDto): Promise<[MentorProfile[], number]> {
    const { q, page, status } = dto;
    const query = this.mentorProfileRepository
      .createQueryBuilder('m')
      .leftJoinAndSelect('m.owner', 'owner')
      .leftJoinAndSelect('m.expertises', 'expertises');
    if (q) query.andWhere('owner.name LIKE :search', { search: `%${q}%` });
    if (status) query.andWhere('m.status = :status', { status });
    if (page) query.skip((+page - 1) * 10).take(10);
    return await query.getManyAndCount();
  }

  async findAll(): Promise<MentorProfile[]> {
    return await this.mentorProfileRepository.find({
      relations: ['owner', 'experiences', 'expertises']
    });
  }

  async approve(id: string): Promise<MentorProfile> {
    try {
      const mentorProfile = await this.findOne(id);
      await this.mentorProfileRepository.update(id, { status: MentorStatus.APPROVED });
      await this.usersService.assignRole(mentorProfile.owner.id, Role.MENTOR);
      return await this.findOne(id);
    } catch {
      throw new BadRequestException();
    }
  }

  async reject(id: string): Promise<MentorProfile> {
    try {
      const mentorProfile = await this.findOne(id);
      await this.mentorProfileRepository.update(id, { status: MentorStatus.REJECTED });
      await this.usersService.assignRole(mentorProfile.owner.id, Role.USER);
      return await this.findOne(id);
    } catch {
      throw new BadRequestException();
    }
  }

  async findOne(id: string): Promise<MentorProfile> {
    try {
      return await this.mentorProfileRepository.findOneOrFail({
        where: { id },
        relations: ['experiences', 'expertises']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, dto: UpdateMentorProfileDto): Promise<MentorProfile> {
    try {
      const mentorProfile = await this.findOne(id);
      if (dto.experiences) {
        await this.experiencesService.saveExperiences(id, dto.experiences);
      }
      return await this.mentorProfileRepository.save({
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
      await this.mentorProfileRepository.softDelete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
