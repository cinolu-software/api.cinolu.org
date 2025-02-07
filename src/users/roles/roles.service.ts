import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  async create(dto: CreateRoleDto): Promise<Role> {
    try {
      return await this.roleRepository.save(dto);
    } catch {
      throw new ConflictException('Erreur lors de la création du rôle');
    }
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find({
      order: { updated_at: 'DESC' }
    });
  }

  async findByName(name: string): Promise<Role> {
    try {
      return await this.roleRepository.findOneOrFail({ where: { name } });
    } catch {
      throw new BadRequestException('Erreur lors de la récupération du rôle');
    }
  }

  async findOne(id: string): Promise<Role> {
    try {
      return await this.roleRepository.findOneOrFail({ where: { id } });
    } catch {
      throw new BadRequestException('Erreur lors de la récupération du rôle');
    }
  }

  async update(id: string, dto: UpdateRoleDto): Promise<Role> {
    try {
      const role = await this.findOne(id);
      const updatedRole: Role & UpdateRoleDto = Object.assign(role, dto);
      return await this.roleRepository.save(updatedRole);
    } catch {
      throw new BadRequestException('Erreur lors de la mise à jour du rôle');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.roleRepository.delete(id);
    } catch {
      throw new BadRequestException('Erreur lors de la suppression du rôle');
    }
  }
}
