import { NextApiRequest, NextApiResponse } from 'next';
import { Verifier } from '@zalter/identity';
import { identityClient } from '../identity';

/**
 * Middleware to check user authentication state.
 */
export async function authMiddleware(req: NextApiRequest, res: NextApiResponse, next: () => void) {
  const signatureHeader = req.headers['x-signature'] as string;

  if (!signatureHeader) {
    console.log('Missing signature header');
    res.status(401).json({ message: 'Not authorized' });
    return;
  }

  // Get the key ID and sig
  const [keyId, sig] = signatureHeader.split(';');

  if (!keyId || !sig) {
    console.log('Invalid signature header format');
    res.status(401).json({ message: 'Not authorized' });
    return;
  }

  // Decode sig to get the signature bytes
  const rawSig = new Uint8Array(Buffer.from(sig, 'base64'));

  // Fetch the user public key from Zalter Identity service
  let keyRecord;

  try {
    keyRecord = await identityClient.getPublicKey(keyId);
  } catch (err: any) {
    console.error(err);

    if (err.statusCode === 404) {
      console.log('Public key not found');
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    res.status(500).json({ message: 'Internal Server Error' });
    return;
  }

  // @ts-ignore
  const { rawBody } = req;

  // Construct data to verify (must be the same value as the data signed on the browser side)
  const dataToVerify = rawBody ? new Uint8Array(rawBody) : new Uint8Array(0);

  // Verify the signature
  const isValid = Verifier.verify(
    keyRecord.key,
    keyRecord.alg,
    rawSig,
    dataToVerify
  );

  if (!isValid) {
    console.log('Invalid signature');
    res.status(401).json({ message: 'Not authorized' });
    return;
  }

  // Persist user ID for other use
  // We can use any storage strategy. Here we simulate the "res.locals" from Express.
  // @ts-ignore
  res.locals = res.locals || {};
  // @ts-ignore
  res.locals.userId = keyRecord.subId;

  // Continue to the next middleware / handler
  next();
}