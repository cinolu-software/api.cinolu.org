import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { FilterRolesDto } from './dto/filter-roles.dto';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get('sign-up')
  signUpRoles(): Promise<Role[]> {
    return this.rolesService.signUpRoles();
  }

  @Post('')
  create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(createRoleDto);
  }

  @Get('paginated')
  findAllPaginated(@Query() queryParams: FilterRolesDto): Promise<[Role[], number]> {
    return this.rolesService.findAllPaginated(queryParams);
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
