// Function to get Bearer Token
// auth.ts
import { Request } from 'express';

export const authBearerToken = (req: Request): string => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new Error('No authorization header provided');
  }
  return authorization.split(' ')[1];
};
