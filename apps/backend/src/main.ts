/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { swaggerConfig } from './app/swagger/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';
import { AuthGuardSwagger } from './app/swagger/swagger.auth.api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Unable Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL
  });

  // Enable swagger
  // Create the Swagger document
  const SwaggerDocument = SwaggerModule.createDocument(app,swaggerConfig);

  // Protect the Swagger route
  app.useGlobalGuards(new AuthGuardSwagger())

  // Serve Swagger UI on the `/swagger` path
  SwaggerModule.setup("api/swagger",app,SwaggerDocument);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
