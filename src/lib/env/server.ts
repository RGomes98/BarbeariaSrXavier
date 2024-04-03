import { z } from 'zod';

const ServerEnvSchema = z.object({
  JWT_SECRET: z.string(),
  ASSAS_PROD_URL: z.string(),
  ASSAS_SANDBOX_URL: z.string(),
  FIREBASE_PROJECT_ID: z.string(),
  FIREBASE_PRIVATE_KEY: z.string(),
  FIREBASE_CLIENT_EMAIL: z.string(),
  ASSAS_PROD_ACCESS_TOKEN: z.string(),
  ASSAS_SANDBOX_ACCESS_TOKEN: z.string(),
});

export const serverEnv = ServerEnvSchema.parse(process.env);
