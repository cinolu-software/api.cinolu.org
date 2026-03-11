import { Module } from '@nestjs/common';
import { ConfigModule as Config } from '@nestjs/config';

@Module({
  imports: [
    Config.forRoot({
      isGlobal: true,
      cache: true
    })
  ]
})
export class ConfigModule {}
