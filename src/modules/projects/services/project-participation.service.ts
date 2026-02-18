import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Readable } from 'stream';
import { parse } from 'fast-csv';
import { ProjectParticipation } from '../entities/project-participation.entity';
import { UsersService } from '@/modules/users/services/users.service';
import { VenturesService } from '@/modules/ventures/services/ventures.service';
import { User } from '@/modules/users/entities/user.entity';
import { ParticipateProjectDto } from '../dto/participate.dto';
import { ProjectsService } from './projects.service';

type ParticipantCsvRow = {
  name: string;
  email: string;
  phone_number?: string;
};

@Injectable()
export class ProjectParticipationService {
  constructor(
    @InjectRepository(ProjectParticipation)
    private readonly participationRepository: Repository<ProjectParticipation>,
    private readonly usersService: UsersService,
    private readonly venturesService: VenturesService,
    private readonly projectsService: ProjectsService
  ) {}

  async findUserParticipations(userId: string): Promise<ProjectParticipation[]> {
    try {
      return await this.participationRepository.find({
        where: { user: { id: userId } },
        relations: ['project', 'project.phases', 'phases', 'venture']
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findParticipations(projectId: string): Promise<ProjectParticipation[]> {
    try {
      await this.projectsService.findOne(projectId);
      return await this.participationRepository.find({
        where: { project: { id: projectId } },
        relations: ['user', 'venture', 'phases'],
        order: { created_at: 'ASC' }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findParticipantsByProject(projectId: string): Promise<User[]> {
    try {
      await this.projectsService.findOne(projectId);
      const participations = await this.participationRepository.find({
        where: { project: { id: projectId } },
        relations: ['user']
      });
      return this.mapUniqueUsers(participations);
    } catch {
      throw new BadRequestException();
    }
  }

  async findParticipantsByPhase(phaseId: string): Promise<User[]> {
    try {
      const participations = await this.participationRepository.find({
        where: { phases: { id: phaseId } },
        relations: ['user']
      });
      return this.mapUniqueUsers(participations);
    } catch {
      throw new BadRequestException();
    }
  }

  async addParticipantsFromCsv(projectId: string, file: Express.Multer.File): Promise<void> {
    try {
      if (!file?.buffer) {
        throw new BadRequestException('A valid CSV file is required');
      }

      const project = await this.projectsService.findOneWithParticipations(projectId);
      const rows = await this.parseParticipantsCsv(file.buffer);
      const userIds = new Set<string>(project.participations?.map((participation) => participation.user.id) ?? []);

      for (const row of rows) {
        const user = await this.usersService.findOrCreateParticipant(row);
        userIds.add(user.id);
      }

      for (const userId of userIds) {
        const existing = await this.participationRepository.findOne({
          where: { project: { id: projectId }, user: { id: userId } }
        });
        if (existing) {
          continue;
        }
        await this.participationRepository.save({
          created_at: project.started_at,
          user: { id: userId },
          project: { id: projectId },
          venture: null
        });
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException();
    }
  }

  async participate(projectId: string, user: User, dto: ParticipateProjectDto): Promise<void> {
    try {
      await this.projectsService.findOne(projectId);
      const venture = await this.venturesService.findOne(dto.ventureId);
      await this.participationRepository.save({
        user: { id: user.id },
        project: { id: projectId },
        venture: venture ? { id: venture.id } : null
      });
    } catch {
      throw new BadRequestException();
    }
  }

  private mapUniqueUsers(participations: ProjectParticipation[]): User[] {
    const seen = new Set<string>();
    return participations
      .map((participation) => participation.user)
      .filter((participant) => {
        if (seen.has(participant.id)) {
          return false;
        }
        seen.add(participant.id);
        return true;
      });
  }

  private parseParticipantsCsv(buffer: Buffer): Promise<ParticipantCsvRow[]> {
    return new Promise((resolve, reject) => {
      const rows: ParticipantCsvRow[] = [];
      const stream = Readable.from(buffer.toString());

      stream
        .pipe(parse({ headers: true }))
        .on('data', (row: Record<string, string>) => {
          const name = (row.Name ?? row.name ?? '').trim();
          const email = (row.Email ?? row.email ?? '').trim();
          const phone_number = (row['Phone Number'] ?? row.phone_number ?? '').trim() || undefined;

          if (name && email) {
            rows.push({ name, email, phone_number });
          }
        })
        .on('end', () => resolve(rows))
        .on('error', reject);
    });
  }
}
