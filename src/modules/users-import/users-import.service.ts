import { BadRequestException, Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { parse } from 'fast-csv';
import { join } from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { RolesService } from '@/modules/users/roles/roles.service';
import { ProjectsService } from '@/modules/projects/projects.service';
import { nanoid } from 'nanoid';

const DEFAULT_PASSWORD = 'user1234';
const DEFAULT_CSV_PATH = 'uploads/users.csv';

export interface ImportResult {
  created: number;
  skipped: number;
  joined: number;
  errors: string[];
}

interface CsvRow {
  name: string;
  email: string;
  phone_number: string;
  project: string;
}

@Injectable()
export class UsersImportService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private rolesService: RolesService,
    private projectsService: ProjectsService
  ) {}

  private async readCsvRows(path: string): Promise<CsvRow[]> {
    return new Promise((resolve, reject) => {
      const rows: CsvRow[] = [];
      createReadStream(path)
        .pipe(
          parse({
            headers: ['name', 'email', 'phone_number', 'project'],
            trim: true
          })
        )
        .on('data', (row: CsvRow) => rows.push(row))
        .on('end', () => resolve(rows))
        .on('error', (err) => reject(new BadRequestException(`CSV read failed: ${err.message}`)));
    });
  }

  async importFromFile(filePath?: string): Promise<ImportResult> {
    const path = filePath ? join(process.cwd(), filePath) : join(process.cwd(), DEFAULT_CSV_PATH);
    const result: ImportResult = { created: 0, skipped: 0, joined: 0, errors: [] };

    const rows = await this.readCsvRows(path);

    for (const row of rows) {
      try {
        const { name, email, phone_number, project } = row;
        if (!email?.trim()) {
          result.errors.push(`Skipped row: missing email (${name || 'unknown'})`);
          result.skipped++;
          continue;
        }
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedPhone = phone_number?.trim() || null;
        const projectName = project?.trim();

        let user = await this.userRepository.findOne({ where: { email: normalizedEmail } });
        if (!user) {
          const role = await this.rolesService.findByName('user');
          user = await this.userRepository.save({
            name: (name || email).trim(),
            email: normalizedEmail,
            phone_number: normalizedPhone,
            password: DEFAULT_PASSWORD,
            referral_code: nanoid(12),
            roles: [role]
          });
          result.created++;
        } else {
          result.skipped++;
        }

        if (projectName) {
          const projectEntity = await this.projectsService.findByName(projectName);
          if (projectEntity) {
            const hasProject = await this.userRepository
              .createQueryBuilder('user')
              .innerJoin('user.participated_projects', 'p', 'p.id = :projectId', {
                projectId: projectEntity.id
              })
              .where('user.id = :userId', { userId: user.id })
              .getCount();
            if (!hasProject) {
              await this.userRepository
                .createQueryBuilder()
                .relation(User, 'participated_projects')
                .of(user.id)
                .add(projectEntity.id);
              result.joined++;
            }
          } else {
            result.errors.push(`Project not found: "${projectName}" (user: ${normalizedEmail})`);
          }
        }
      } catch (err) {
        result.errors.push(
          `Row error: ${err instanceof Error ? err.message : String(err)} (${JSON.stringify(row)})`
        );
      }
    }

    return result;
  }
}
