import { NextApiRequest, NextApiResponse } from 'next';
import { authMiddleware } from '../../lib/middlewares/auth-middleware';
import { bodyParserMiddleware } from '../../lib/middlewares/body-parser-middleware';
import { runMiddleware } from '../../lib/run-middleware';

// Disable default body parser middleware
export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, bodyParserMiddleware);
  await runMiddleware(req, res, authMiddleware);

  // If we got here, the user is authorized
  // we can now respond with data

  res.status(200).end();
}