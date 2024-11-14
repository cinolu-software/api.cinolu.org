import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramApplication } from './entities/application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramApplication])],
  controllers: [],
  providers: []
})
export class ProgramApplicationsModule {}
