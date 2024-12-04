import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateCallDto } from '../dto/create-call.dto';
import { UpdateCallDto } from '../dto/update-call.dto';
import { CallsService } from '../services/calls.service';
import { Call } from '../entities/call.entity';

@Controller('calls')
export class CallsController {
  constructor(private readonly callsService: CallsService) {}

  @Post()
  create(@Body() createCallDto: CreateCallDto): Promise<{ data: Call }> {
    return this.callsService.create(createCallDto);
  }

  @Get()
  findAll(): Promise<{ data: Call[] }> {
    return this.callsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ data: Call }> {
    return this.callsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCallDto): Promise<{ data: Call }> {
    return this.callsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.callsService.remove(id);
  }
}
