
import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('CortexAccess API')
  .setDescription('The CortexAccess API description')
  .setVersion('1')
  .addTag('cortex-access')
  .addBearerAuth() // Add Bearer token authentication if required
  .build();


