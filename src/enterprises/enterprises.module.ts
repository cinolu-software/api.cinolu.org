import { Module } from '@nestjs/common';
import { EnterprisesService } from './enterprises.service';
import { EnterprisesController } from './enterprises.controller';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enterprise } from './entities/enterprise.entity';
import { EnterpriseSubscriber } from './subscribers/enterprise.subscriber';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([Enterprise])],
  controllers: [EnterprisesController],
  providers: [EnterprisesService, EnterpriseSubscriber]
})
export class EnterprisesModule {}
