import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';


export const getPgConfig = async (configService: ConfigService) : Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: configService.getOrThrow<string>('PG_HOST'),
  port: configService.getOrThrow<number>('PG_PORT'),
  database: configService.getOrThrow<string>('PG_DATABASE'),
  entities: [],
  username: configService.getOrThrow<string>('PG_USERNAME'),
  password: configService.getOrThrow<string>('PG_PASSWORD'),
  logging: true,
  synchronize: true,
})
