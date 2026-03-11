import { DynamicModule, Module } from '@nestjs/common';
import { SessionAuthModule, ModuleRbacPolicy } from 'nestjs-session-auth';

/**
 * Thin wrapper around SessionAuthModule.forFeature for backward compatibility.
 * @deprecated Use SessionAuthModule.forFeature() directly from 'nestjs-session-auth'
 */
@Module({})
export class RBACModule {
  static forFeature(policies: ModuleRbacPolicy[]): DynamicModule {
    return SessionAuthModule.forFeature(policies);
  }
}
