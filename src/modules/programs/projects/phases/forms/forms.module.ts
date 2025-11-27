import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { PhaseForm } from './entities/form.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhaseForm])],
  controllers: [FormsController],
  providers: [FormsService],
  exports: [FormsService]
})
export class FormsModule {}
