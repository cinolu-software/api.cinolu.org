import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { PhaseForm } from './entities/form.entity';
import { Submission } from './submissions/entities/submission.entity';
import { SubmissionsController } from './submissions/submissions.controller';
import { SubmissionsService } from './submissions/submissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([PhaseForm, Submission])],
  controllers: [FormsController, SubmissionsController],
  providers: [FormsService, SubmissionsService],
  exports: [FormsService, SubmissionsService]
})
export class FormsModule {}
