import { object, string } from 'yup';

const options = {
  strict: false,
  abortEarly: false,
  stripUnknown: true,
  recursive: true,
};

const envSchema = object({
  AUTH0_USER_AUDIENCE: string().url().required(),
  AUTH0_DOMAIN: string().required(),
});

export default (rawEnv) => envSchema.validateSync(rawEnv, options);
