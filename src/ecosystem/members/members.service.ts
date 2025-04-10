import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs-extra';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>
  ) {}

  async create(dto: CreateMemberDto): Promise<Member> {
    try {
      return await this.memberRepository.save(dto);
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<Member[]> {
    return await this.memberRepository.find();
  }

  async findByCategory(category: string): Promise<Member[]> {
    try {
      return await this.memberRepository.find({
        where: {
          categories: { name: category }
        }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findOne(id: string): Promise<Member> {
    try {
      return await this.memberRepository.findOneOrFail({
        where: { id }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async addLogo(id: string, file: Express.Multer.File): Promise<Member> {
    try {
      const member = await this.findOne(id);
      if (member.logo) await fs.unlink(`./uploads/members/${member.logo}`);
      return await this.memberRepository.save({ ...member, logo: file.filename });
    } catch {
      throw new BadRequestException();
    }
  }

  async update(id: string, dto: UpdateMemberDto): Promise<Member> {
    try {
      const member = await this.findOne(id);
      return await this.memberRepository.save({ ...member, ...dto });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.memberRepository.softDelete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
