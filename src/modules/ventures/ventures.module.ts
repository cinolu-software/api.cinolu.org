import { Module } from '@nestjs/common';
import { VenturesService } from './services/ventures.service';
import { VenturesController } from './ventures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venture } from './entities/venture.entity';
import { VentureSubscriber } from './subscribers/venture.subscriber';
import { ProductsModule } from './products/products.module';
import { VentureDocument } from './entities/document.entity';
import { VenturesEmailService } from './services/ventures-email.service';
import { VentureMediaService } from './services/venture-media.service';
import { VENTURES_RBAC } from './ventures-rbac';
import { GalleriesModule } from '@/shared/galleries/galleries.module';

@Module({
  imports: [TypeOrmModule.forFeature([Venture, VentureDocument]), ProductsModule, GalleriesModule],
  controllers: [VenturesController],
  providers: [VenturesService, VentureMediaService, VenturesEmailService, VentureSubscriber, VENTURES_RBAC],
  exports: [VenturesService]
})
export class VenturesModule {}
