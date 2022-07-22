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

  // To retrieve the user ID set in auth middleware you can use
  // res.locals.userId

  // Now you can retrieve the user data from your database.

  res.status(200).json({
    amount: '$ 13,120',
    accounts: {
      usd: 'CH5604835012345678009',
      eur: 'CH5604857112345678713'
    }
  });
}