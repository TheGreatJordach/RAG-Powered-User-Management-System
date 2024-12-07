import { IsInt, IsNotEmpty, IsPositive, IsString, IsStrongPassword } from 'class-validator';
import { EnvKeys } from './env.variable.keys';


/**
 * Class for validating environment variables using class-validator decorators.
 * Each property corresponds to a required environment variable.
 * Validation rules ensure that the variable values meet specified criteria.
 */
export class ValidateEnvVariables{

  // Database configuration
  @IsString({ message: `${EnvKeys.PG_USERNAME} must be a string.` })
  @IsNotEmpty({ message: `${EnvKeys.PG_USERNAME} cannot be empty.` })
  PG_USERNAME: string;

  @IsStrongPassword({}, { message: `${EnvKeys.PG_PASSWORD} must be a strong password.` })
  @IsNotEmpty({ message: `${EnvKeys.PG_PASSWORD} cannot be empty.` })
  PG_PASSWORD: string;

  @IsString({ message: `${EnvKeys.PG_DATABASE} must be a string.` })
  @IsNotEmpty({ message: `${EnvKeys.PG_DATABASE} cannot be empty.` })
  PG_DATABASE: string;

  @IsString({ message: `${EnvKeys.PG_HOST} must be a string.` })
  @IsNotEmpty({ message: `${EnvKeys.PG_HOST} cannot be empty.` })
  PG_HOST: string;

  @IsInt({ message: `${EnvKeys.PG_PORT} must be an integer.` })
  @IsPositive({ message: `${EnvKeys.PG_PORT} must be a positive number.` })
  PG_PORT: number;

 // MailHog configuration
  @IsString({ message: `${EnvKeys.MAILHOG_DB_TYPE} must be a string.` })
  @IsNotEmpty({ message: `${EnvKeys.MAILHOG_DB_TYPE} cannot be empty.` })
  MAILHOG_DB_TYPE:string
  @IsString({ message: `${EnvKeys.MAILHOG_DB_PATH} must be a string.` })
  @IsNotEmpty({ message: `${EnvKeys.MAILHOG_DB_PATH} cannot be empty.` })
  MAILHOG_DB_PATH:string
  @IsInt({ message: `${EnvKeys.MAIL_WEB_INTERFACE_PORT} must be an integer.` })
  @IsPositive({ message: `${EnvKeys.MAIL_WEB_INTERFACE_PORT} must be a positive number.` })
  MAIL_WEB_INTERFACE_PORT:number
  @IsInt({ message: `${EnvKeys.MAIL_SMTP_PORT} must be an integer.` })
  @IsPositive({ message: `${EnvKeys.MAIL_SMTP_PORT} must be a positive number.` })
  MAIL_SMTP_PORT:number

  //Redis configuration (if needed for caching)
  @IsString({ message: `${EnvKeys.REDIS_HOST} must be a string.` })
  @IsNotEmpty({ message: `${EnvKeys.REDIS_HOST} cannot be empty.` })
  REDIS_HOST:string
  @IsInt({ message: `${EnvKeys.REDIS_PORT} must be an integer.` })
  @IsPositive({ message: `${EnvKeys.REDIS_PORT} must be a positive number.` })
  REDIS_PORT:number

  //Meilisearch configuration (if needed)
  @IsString({ message: `${EnvKeys.MEILI_MASTER_KEY} must be a string.` })
  @IsNotEmpty({ message: `${EnvKeys.MEILI_MASTER_KEY} cannot be empty.` })
  MEILI_MASTER_KEY:string
  @IsInt({ message: `${EnvKeys.MEILI_PORT} must be an integer.` })
  @IsPositive({ message: `${EnvKeys.MEILI_PORT} must be a positive number.` })
  MEILI_PORT:number

}



