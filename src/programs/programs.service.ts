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

  async create(dto: CreateProgramDto): Promise<{ data: Program }> {
    try {
      const data = await this.programRepository.save({
        ...dto
      });
      return { data };
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<{ data: Program[] }> {
    const data = await this.programRepository.find();
    return { data };
  }

  async findOne(id: string): Promise<{ data: Program }> {
    try {
      const data = await this.programRepository.findOneOrFail({
        where: { id }
      });
      return { data };
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, dto: UpdateProgramDto): Promise<{ data: Program }> {
    try {
      const { data: program } = await this.findOne(id);
      const data = await this.programRepository.save({
        ...program,
        ...dto
      });
      return { data };
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
