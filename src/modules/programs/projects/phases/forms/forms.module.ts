import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { PhaseForm } from './entities/form.entity';
import { Submission } from './submissions/entities/submission.entity';
import { FormSubmissionsController } from './submissions/submissions.controller';
import { FormSubmissionsService } from './submissions/submissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([PhaseForm, Submission])],
  controllers: [FormsController, FormSubmissionsController],
  providers: [FormsService, FormSubmissionsService],
  exports: [FormsService, FormSubmissionsService]
})
export class FormsModule {}
