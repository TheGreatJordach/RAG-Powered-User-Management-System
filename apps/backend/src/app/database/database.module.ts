import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getPgConfig } from './get.pg.config';
import { loadValidEnv } from './helper.validation.func';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath:"docker/.env", validate: loadValidEnv}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPgConfig
    }),
    // SQLite configuration for MailHog
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database:"data/mailhog.db",
      synchronize: true,
      logging: true,
    })
  ]
})
export class DatabaseModule {}
