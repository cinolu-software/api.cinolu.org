import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { Program } from './entities/program.entity';
import { Auth } from 'src/shared/decorators/auth.decorators';
import { RoleEnum } from 'src/shared/enums/roles.enum';
import { QueryParams } from './utils/types/query-params.type';

@Controller('programs')
@Auth(RoleEnum.Staff)
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post()
  create(@Body() dto: CreateProgramDto): Promise<Program> {
    return this.programsService.create(dto);
  }

  @Get('')
  @Auth(RoleEnum.Guest)
  findAll(): Promise<Program[]> {
    return this.programsService.findAll();
  }

  @Get('paginated')
  findAllPaginated(@Query() queryParams: QueryParams): Promise<[Program[], number]> {
    return this.programsService.findAllPaginated(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Program> {
    return this.programsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramDto: UpdateProgramDto): Promise<Program> {
    return this.programsService.update(id, updateProgramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.programsService.remove(id);
  }
}
