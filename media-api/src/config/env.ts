import * as Joi from 'joi';
export const envSchema = Joi.object({
  DATABASE_URL: Joi.string(),
  PORT: Joi.number().default(4000),
});