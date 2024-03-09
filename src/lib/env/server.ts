import { z } from 'zod';

const ServerEnvSchema = z.object({
  FIREBASE_PRIVATE_KEY: z.string(),
  FIREBASE_PROJECT_ID: z.string(),
  FIREBASE_CLIENT_EMAIL: z.string(),
});

export const serverEnv = ServerEnvSchema.parse(process.env);
