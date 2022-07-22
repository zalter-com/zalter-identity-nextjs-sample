import { IdentityClient } from '@zalter/identity';

/**
 * Identity client for Node.js
 */
export const identityClient = new IdentityClient({
  projectId: process.env.NEXT_PUBLIC_ZALTER_PROJECT_ID!,
  credentials: process.env.ZALTER_CREDENTIALS!
});