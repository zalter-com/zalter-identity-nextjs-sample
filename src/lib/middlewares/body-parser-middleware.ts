import bodyParser from 'body-parser';

/**
 * Custom bodyParser to persist both body and rawBody (used to verify the signature)
 */
export const bodyParserMiddleware = bodyParser.json({
  verify: (req, res, buf) => {
    // @ts-ignore
    req.rawBody = buf
  }
});