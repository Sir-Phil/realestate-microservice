// authenticate.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authBearerToken } from '../requests';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = authBearerToken(req);
    const decoded = jwt.verify(token, process.env.SECRET_KEY || 'secret');
    req.user = decoded; // Attach the decoded user to the request object
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authenticate;
