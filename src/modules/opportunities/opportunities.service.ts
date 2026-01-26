import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { FilterOpportunitiesDto } from './dto/filter-opportunities.dto';
import { Opportunity } from './entities/opportunity.entity';
import { OpportunityAttachment } from './entities/attachment.entity';
import { User } from '@/modules/users/entities/user.entity';
import { promises as fs } from 'fs';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class OpportunitiesService {
  constructor(
    @InjectRepository(Opportunity)
    private opportunityRepository: Repository<Opportunity>,
    @InjectRepository(OpportunityAttachment)
    private attachmentRepository: Repository<OpportunityAttachment>,
    private eventEmitter: EventEmitter2
  ) {}

  async create(dto: CreateOpportunityDto, creator: User): Promise<Opportunity> {
    try {
      const opportunity = await this.opportunityRepository.save({
        ...dto,
        tags: dto.tags.map((id) => ({ id })),
        creator: { id: creator.id }
      });
      this.eventEmitter.emit('opportunity.published', opportunity);
      return opportunity;
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(dto: FilterOpportunitiesDto): Promise<[Opportunity[], number]> {
    try {
      const { page = 1, q } = dto;
      const query = this.opportunityRepository
        .createQueryBuilder('opportunity')
        .leftJoinAndSelect('opportunity.tags', 'tags')
        .orderBy('opportunity.started_at', 'DESC');
      if (q) query.andWhere('(opportunity.title LIKE :q OR opportunity.description LIKE :q)', { q: `%${q}%` });
      return await query
        .skip((+page - 1) * 20)
        .take(20)
        .getManyAndCount();
    } catch {
      throw new BadRequestException();
    }
  }

  async findForUser(user: User): Promise<[Opportunity[], number]> {
    try {
      const userTagIds = user.interests?.map((tag) => tag.id) || [];
      const query = this.opportunityRepository
        .createQueryBuilder('opportunity')
        .leftJoinAndSelect('opportunity.tags', 'tags')
        .orderBy('opportunity.started_at', 'DESC');
      const allOpportunities = await query.getMany();
      const matchingInterests = allOpportunities.filter((opp) => opp.tags.some((tag) => userTagIds.includes(tag.id)));
      return [matchingInterests, matchingInterests.length];
    } catch {
      throw new BadRequestException();
    }
  }

  async findAllForAdmin(dto: FilterOpportunitiesDto): Promise<[Opportunity[], number]> {
    try {
      const { page = 1, q } = dto;
      const query = this.opportunityRepository
        .createQueryBuilder('opportunity')
        .leftJoinAndSelect('opportunity.tags', 'tags')
        .leftJoinAndSelect('opportunity.creator', 'creator')
        .orderBy('opportunity.created_at', 'DESC');
      if (q) query.andWhere('(opportunity.title LIKE :q OR opportunity.description LIKE :q)', { q: `%${q}%` });
      return await query
        .skip((+page - 1) * 20)
        .take(20)
        .getManyAndCount();
    } catch {
      throw new BadRequestException();
    }
  }

  async findBySlug(slug: string): Promise<Opportunity> {
    try {
      return await this.opportunityRepository.findOneOrFail({
        where: { slug },
        relations: ['tags', 'creator', 'attachments']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async findOne(id: string): Promise<Opportunity> {
    try {
      return await this.opportunityRepository.findOneOrFail({
        where: { id },
        relations: ['tags', 'creator', 'attachments']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, dto: UpdateOpportunityDto): Promise<Opportunity> {
    try {
      const opportunity = await this.findOne(id);
      return await this.opportunityRepository.save({
        ...opportunity,
        ...dto,
        tags: dto.tags.map((tagId) => ({ id: tagId }))
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const opportunity = await this.findOne(id);
      await this.opportunityRepository.softDelete(opportunity);
    } catch {
      throw new BadRequestException();
    }
  }

  async addAttachment(opportunityId: string, file: Express.Multer.File): Promise<OpportunityAttachment> {
    try {
      const opportunity = await this.findOne(opportunityId);
      return await this.attachmentRepository.save({
        filename: file.filename,
        opportunity: { id: opportunity.id }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async removeAttachment(attachmentId: string): Promise<void> {
    try {
      const attachment = await this.attachmentRepository.findOneOrFail({
        where: { id: attachmentId },
        relations: ['opportunity']
      });
      await fs.unlink(`./uploads/opportunities/attachments/${attachment.filename}`);
      await this.attachmentRepository.delete(attachment);
    } catch {
      throw new NotFoundException();
    }
  }
}
