import { Module } from '@nestjs/common';
import { VenturesService } from './ventures.service';
import { VenturesController } from './ventures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venture } from './entities/venture.entity';
import { VentureSubscriber } from './subscribers/venture.subscriber';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Venture]), ProductsModule],
  controllers: [VenturesController],
  providers: [VenturesService, VentureSubscriber]
})
export class VenturesModule {}
