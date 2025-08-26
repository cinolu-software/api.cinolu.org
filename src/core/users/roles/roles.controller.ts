import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { FilterRolesDto } from './dto/filter-roles.dto';
import { UseRoles } from 'nest-access-control';
import { Public } from '../../../shared/decorators/public.decorator';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get('sign-up')
  @Public()
  signUpRoles(): Promise<Role[]> {
    return this.rolesService.signUpRoles();
  }

  @Post('')
  @UseRoles({ resource: 'roles', action: 'create' })
  create(@Body() dto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(dto);
  }

  @Get('paginated')
  @UseRoles({ resource: 'roles', action: 'read' })
  findAllPaginated(@Query() queryParams: FilterRolesDto): Promise<[Role[], number]> {
    return this.rolesService.findAllPaginated(queryParams);
  }

  @Get('')
  @UseRoles({ resource: 'roles', action: 'read' })
  findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @UseRoles({ resource: 'roles', action: 'read' })
  findOne(@Param('id') id: string): Promise<Role> {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @UseRoles({ resource: 'roles', action: 'update' })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<Role> {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @UseRoles({ resource: 'roles', action: 'delete' })
  remove(@Param('id') id: string): Promise<void> {
    return this.rolesService.remove(id);
  }
}
