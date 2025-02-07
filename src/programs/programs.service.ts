import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { Repository } from 'typeorm';
import { Program } from './entities/program.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>
  ) {}

  async create(dto: CreateProgramDto): Promise<Program> {
    try {
      return await this.programRepository.save({
        ...dto
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<Program[]> {
    return await this.programRepository.find();
  }

  async findOne(id: string): Promise<Program> {
    try {
      return await this.programRepository.findOneOrFail({
        where: { id }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, dto: UpdateProgramDto): Promise<Program> {
    try {
      const program = await this.findOne(id);
      return await this.programRepository.save({
        ...program,
        ...dto
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.programRepository.softDelete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
