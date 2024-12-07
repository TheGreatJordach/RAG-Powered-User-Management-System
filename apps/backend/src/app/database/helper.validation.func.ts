import { HttpStatus, ValidationError } from '@nestjs/common';
import { ValidateEnvVariables } from './validate.env.variables';
import { EnvKeys, EnvKeysType } from './env.variable.keys';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ConfigError } from './custom.validation.error';


/**
 * Formats an array of ValidationError objects into an array of strings.
 * Each string contains the property name and the associated validation message.
 *
 * @param errors - An array of ValidationError objects to be formatted.
 * @returns An array of formatted error messages as strings.
 */
export function formatValidationErrors(errors:ValidationError[]): string[] {
  const messages:string[] = [];
  errors.forEach(e => {
    if(e.constraints){
      for (const message of Object.keys(e.constraints)){
        messages.push(`${e.property}: ${message}`);
      }
    }
  })

  return messages
}


/**
 * Processes validation results and generates status reports.
 *
 * @param validated - The validated environment variables instance.
 * @param errors - Array of validation errors.
 * @param formatedMessage
 * @returns Array of validation results and formatted error messages.
 */
export function validateResults(
  validated:ValidateEnvVariables,errors:ValidationError[],
  formatedMessage :typeof formatValidationErrors = formatValidationErrors
){
  const validResults: string[] = []
  const errorMessages = formatedMessage(errors);

  // Dynamically iterate over the properties of EnvKeys
  const properties = Object.keys(EnvKeys) as EnvKeysType[];

  properties.forEach(property => {
    const isValid = errors.every(error => error.property !== property);
    validResults.push(`${property}: ${isValid ? "OK" : "INVALID"}`);
  })

  return [...validResults,...errorMessages];
}


/**
 * Validates environment variables and throws errors if validation fails.
 *
 * @param envs - The environment variables object to validate.
 * @param processResult - Function to process and report validation results.
 * @returns Validated environment variables if successful.
 * @throws ConfigError if validation fails.
 */
export function loadValidEnv(
  envs: Record<string, unknown>,
  processResult: typeof validateResults = validateResults,
){
  const validEnvs : ValidateEnvVariables = plainToInstance(ValidateEnvVariables,envs, {
    enableImplicitConversion: true,
  })

  const errors = validateSync(validEnvs,{
    skipMissingProperties:false
  })

  const validationResults: string[] = processResult(validEnvs,errors)

  if (errors.length > 0) {
    const errorMessage = `${errors.length} variable(s) failed validation:\n${validationResults.join('\n')}`;
    // TODO Log the error once without rethrowing it as a log
    console.error(errorMessage);

    // Throw HttpException without duplicating the log
    throw new ConfigError({
        errorType: 'configErr',
        where: 'ValidateEnvVariables',
        date: new Date().toISOString(),
        data: null,
        message: "Environment validation failed",
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    )
  }

  console.log("[CortexAccess] -All Environment variable are validated and loaded 💪");

  return validEnvs
}
