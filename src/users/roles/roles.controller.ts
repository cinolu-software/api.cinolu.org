import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Auth } from '../../shared/decorators/auth.decorators';
import { RoleEnum } from '../../shared/enums/roles.enum';

@Controller('roles')
@Auth(RoleEnum.Staff)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('')
  create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(createRoleDto);
  }

  @Get('')
  findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Role> {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<Role> {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.rolesService.remove(id);
  }
}
