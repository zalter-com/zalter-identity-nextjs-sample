import { Buffer } from 'buffer';
import { auth } from './auth';

/**
 * Signs the request init that will be used in fetch
 * This example expects body (when defined) to be a string. It can be adjusted to support buffers.
 * @param {RequestInit} requestInit
 * @return {Promise<RequestInit>}
 */
export async function signRequest(requestInit: RequestInit): Promise<RequestInit> {
  const { method, headers, body } = requestInit;

  // Load current user and get their public key ID
  const user = await auth.getCurrentUser();

  if (!user) {
    throw new Error('Must be logged in to sign a request');
  }

  const keyId = user.subSigKeyId;

  // Construct the message to sign
  // Note: In this case, the message is just the request body, but it could be anything,
  // such as the request URL, request method or any headers.
  const dataToSign = body ? new TextEncoder().encode(body as string) : new Uint8Array(0);

  // Create the signature by signing the message
  const sig = await user.signMessage(dataToSign);

  // Encode the signature to be able to send it as a header
  const encodedSig = Buffer.from(sig).toString('base64');

  return {
    method,
    headers: {
      ...headers,
      // Add the signature header
      'x-signature': `${keyId};${encodedSig}`
    },
    body
  };
}