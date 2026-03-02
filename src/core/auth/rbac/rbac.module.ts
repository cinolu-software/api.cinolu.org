import { DynamicModule, Module } from '@nestjs/common';
import { ModuleRbacPolicy } from './rbac-policy';
import { createRbacProviders } from './rbac.provider';

@Module({})
export class RBACModule {
  static forFeature(policies: ModuleRbacPolicy[]): DynamicModule {
    return {
      module: RBACModule,
      providers: createRbacProviders(policies)
    };
  }
}
