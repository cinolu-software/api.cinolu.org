import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Application])],
  controllers: [],
  providers: []
})
export class ApplicationsModule {}
