import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MentorProfile } from './entities/mentor.entity';
import { User } from '../users/entities/user.entity';
import { promises as fs } from 'fs';
import { FilterMentorsDto } from './dto/filter-mentors.dto';
import { UsersService } from '../users/users.service';
import { MentorStatus } from './enums/mentor.enum';
import { ExperiencesService } from './experiences.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Role } from '@/core/auth/enums/roles.enum';

@Injectable()
export class MentorsService {
  constructor(
    @InjectRepository(MentorProfile)
    private mentorRepository: Repository<MentorProfile>,
    private usersService: UsersService,
    private experiencesService: ExperiencesService,
    private eventEmitter: EventEmitter2
  ) {}

  async create(user: User, dto: CreateMentorDto): Promise<MentorProfile> {
    try {
      const mentorProfile = await this.mentorRepository.save({
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
      return await this.mentorRepository.save(mentor);
    } catch {
      throw new BadRequestException();
    }
  }

  async findFiltered(dto: FilterMentorsDto): Promise<[MentorProfile[], number]> {
    const { q, page, status } = dto;
    const query = this.mentorRepository
      .createQueryBuilder('m')
      .leftJoinAndSelect('m.owner', 'owner')
      .leftJoinAndSelect('m.expertises', 'expertises');
    if (q) query.andWhere('owner.name LIKE :search', { search: `%${q}%` });
    if (status) query.andWhere('m.status = :status', { status });
    if (page) query.skip((+page - 1) * 10).take(10);
    return await query.getManyAndCount();
  }

  async findAll(): Promise<MentorProfile[]> {
    return await this.mentorRepository.find({
      relations: ['owner', 'experiences', 'expertises']
    });
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

  async findForUser(user: User): Promise<MentorProfile[]> {
    return await this.mentorRepository.find({
      where: { owner: { id: user.id } },
      relations: ['experiences', 'expertises']
    });
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

  async update(id: string, dto: UpdateMentorDto): Promise<MentorProfile> {
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
}
