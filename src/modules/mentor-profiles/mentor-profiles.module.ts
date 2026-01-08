import { Module } from '@nestjs/common';
import { MentorProfilesService } from './mentor-profiles.service';
import { MentorProfileController } from './mentor-profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentorProfile } from './entities/mentor-profile.entity';
import { Experience } from './entities/experience.entity';
import { ExpertisesModule } from './expertises/expertises.module';
import { UsersModule } from '../users/users.module';
import { ExperiencesService } from './experiences.service';

@Module({
  imports: [TypeOrmModule.forFeature([MentorProfile, Experience]), ExpertisesModule, UsersModule],
  controllers: [MentorProfileController],
  providers: [MentorProfilesService, ExperiencesService]
})
export class MentorProfileModule {}
