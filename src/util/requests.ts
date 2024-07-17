// auth.ts
import { Request } from 'express';

export const authBearerToken = (req: Request): string => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new Error('No authorization header provided');
  }
  return authorization.split(' ')[1];
};


// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// export const authenticate = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers['authorization']?.split(' ')[1];
//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.SECRET_KEY || 'secret');
//     req.user = decoded; // Attach decoded user to request object
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
// };

