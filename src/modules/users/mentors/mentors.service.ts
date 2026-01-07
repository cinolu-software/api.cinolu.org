import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mentor } from './entities/mentor.entity';
import { User } from '../entities/user.entity';
import { promises as fs } from 'fs';
import { MentorStatus } from '../enums/mentor.enum';
import { FilterMentorsDto } from './dto/filter-mentors.dto';

@Injectable()
export class MentorsService {
  constructor(
    @InjectRepository(Mentor)
    private mentorRepository: Repository<Mentor>
  ) {}

  async create(user: User, dto: CreateMentorDto): Promise<Mentor> {
    try {
      const mentor = this.mentorRepository.create({
        ...dto,
        experiences: dto.experiences.map((experience) => ({
          ...experience
        })),
        expertises: dto.expertises.map((id) => ({ id })),
        user: { id: user.id }
      });
      return await this.mentorRepository.save(mentor);
    } catch {
      throw new BadRequestException();
    }
  }

  async addCv(id: string, file: Express.Multer.File): Promise<Mentor> {
    try {
      const mentor = await this.findOne(id);
      if (mentor.cv) await fs.unlink(`./uploads/mentors/cvs/${mentor.cv}`);
      mentor.cv = file.filename;
      return await this.mentorRepository.save(mentor);
    } catch {
      throw new BadRequestException();
    }
  }

  async findFiltered(dto: FilterMentorsDto): Promise<[Mentor[], number]> {
    const { q, page, status } = dto;
    const query = this.mentorRepository.createQueryBuilder('m');
    if (q) query.andWhere('m.user.name LIKE :search', { search: `%${q}%` });
    if (status) query.andWhere('m.status = :status', { status });
    if (page) query.skip((+page - 1) * 10).take(10);
    return await query.getManyAndCount();
  }

  async findAll(): Promise<Mentor[]> {
    return await this.mentorRepository.find({
      relations: ['user', 'experiences', 'expertises']
    });
  }

  async approve(id: string): Promise<Mentor> {
    try {
      const mentor = await this.findOne(id);
      return await this.mentorRepository.save({
        ...mentor,
        status: MentorStatus.APPROVED
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async reject(id: string): Promise<Mentor> {
    try {
      const mentor = await this.findOne(id);
      return await this.mentorRepository.save({
        ...mentor,
        status: MentorStatus.REJECTED
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findOne(id: string): Promise<Mentor> {
    return await this.mentorRepository.findOne({
      where: { id },
      relations: ['user', 'experiences', 'expertises']
    });
  }

  async update(id: string, dto: UpdateMentorDto): Promise<Mentor> {
    try {
      await this.mentorRepository.update(id, {
        ...dto,
        expertises: dto.expertises.map((id) => ({ id })),
        experiences: dto.experiences.map((experience) => ({
          ...experience
        }))
      });
      return await this.mentorRepository.findOne({ where: { id } });
    } catch {
      throw new BadRequestException();
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
