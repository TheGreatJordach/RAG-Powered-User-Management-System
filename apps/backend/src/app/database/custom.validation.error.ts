import { HttpException } from '@nestjs/common';

/**
 * Custom exception class for handling configuration-related errors.
 */
export class ConfigError extends HttpException{}
