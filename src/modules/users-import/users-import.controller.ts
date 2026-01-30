import { Body, Controller, Post } from '@nestjs/common';
import { UsersImportService, ImportResult } from './users-import.service';
import { Public } from '@/core/auth/decorators/public.decorator';

@Controller('users-import')
export class UsersImportController {
  constructor(private readonly usersImportService: UsersImportService) {}

  @Post()
  @Public()
  async importFromFile(@Body('filePath') filePath?: string): Promise<ImportResult> {
    return this.usersImportService.importFromFile(filePath);
  }
}
