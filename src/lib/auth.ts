import { Auth } from '@zalter/identity-js';

/**
 * Identity Auth client for browser
 */
export const auth = new Auth({
  projectId: process.env.NEXT_PUBLIC_ZALTER_PROJECT_ID!
});