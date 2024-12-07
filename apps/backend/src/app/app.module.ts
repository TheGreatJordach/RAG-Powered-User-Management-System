import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PdfModule } from './pdf/pdf.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, PdfModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
