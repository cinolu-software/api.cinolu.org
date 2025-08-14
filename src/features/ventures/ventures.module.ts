import { Module } from '@nestjs/common';
import { VenturesService } from './ventures.service';
import { VenturesController } from './ventures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venture } from './entities/venture.entity';
import { VentureSubscriber } from './subscribers/venture.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Venture])],
  controllers: [VenturesController],
  providers: [VenturesService, VentureSubscriber]
})
export class VenturesModule {}
