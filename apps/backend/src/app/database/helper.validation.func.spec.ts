import { ValidationError } from '@nestjs/common';
import { ValidateEnvVariables } from './validate.env.variables';
import { formatValidationErrors, loadValidEnv, validateResults } from './helper.validation.func';
import { ConfigError } from './custom.validation.error';


describe('Environment Validation Functions', () => {
  describe('formatValidationErrors', () => {
    it('should return formatted error messages', () => {
      const errors: ValidationError[] = [
        {
          property: 'PG_USERNAME',
          constraints: {
            isNotEmpty: 'PG_USERNAME should not be empty',
            isString: 'PG_USERNAME must be a string',
          },
          children: [],
        },
      ];

      const result = formatValidationErrors(errors);

      expect(result).toEqual([
        'PG_USERNAME: isNotEmpty',
        'PG_USERNAME: isString',
      ]);
    });

    it('should return an empty array if there are no constraints', () => {
      const errors: ValidationError[] = [
        { property: 'PG_USERNAME', constraints: null, children: [] },
      ];

      const result = formatValidationErrors(errors);

      expect(result).toEqual([]);
    });
  });

  describe('validateResults', () => {
    it('should correctly validate and return status reports', () => {
      const validated = new ValidateEnvVariables();
      const errors: ValidationError[] = [
        { property: 'PG_USERNAME', constraints: { isNotEmpty: 'Error' }, children: [] },
      ];

      const result = validateResults(validated, errors);

      expect(result).toContain('PG_USERNAME: INVALID');
      expect(result).toContain('PG_USERNAME: isNotEmpty');
    });

    it('should mark all properties as valid if there are no errors', () => {
      const validated = new ValidateEnvVariables();
      const errors: ValidationError[] = [];

      const result = validateResults(validated, errors);

      Object.keys(validated).forEach((key) => {
        expect(result).toContain(`${key}: OK`);
      });
    });
  });

  describe('loadValidEnv', () => {
    it('should return validated environment variables if all are valid', () => {
      const envs = {
        PG_USERNAME: 'postgres',
        PG_PASSWORD: 'StrongPassword!123',
        PG_DATABASE: 'test_db',
        PG_HOST: 'localhost',
        PG_PORT: 5432,
        MAILHOG_DB_TYPE: 'sqlite',
        MAILHOG_DB_PATH: '/data/mailhog.db',
        MAIL_WEB_INTERFACE_PORT: 8025,
        MAIL_SMTP_PORT: 1025,
        REDIS_HOST: 'localhost',
        REDIS_PORT: 6379,
        MEILI_MASTER_KEY: 'masterKey123',
        MEILI_PORT: 7700,
      };

      const result = loadValidEnv(envs);

      expect(result).toBeInstanceOf(ValidateEnvVariables);
      expect(result.PG_USERNAME).toEqual(envs.PG_USERNAME);
    });

    it('should throw a ConfigError if validation fails', () => {
      const envs = {
        PG_USERNAME: '',
        PG_PASSWORD: 'weak',
        PG_PORT: 'invalid_port',
      };

      expect(() => loadValidEnv(envs)).toThrow(ConfigError);
    });

    it('should log validation errors to the console', () => {
      const envs = {
        PG_USERNAME: '',
        PG_PASSWORD: 'weak',
        PG_PORT: 'invalid_port',
      };

      console.error = jest.fn();

      try {
        loadValidEnv(envs);
      } catch (error) {
        expect(console.error).toHaveBeenCalled();
      }
    });
  });
});
