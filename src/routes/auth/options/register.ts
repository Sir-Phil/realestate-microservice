import { Request, Response, NextFunction } from 'express';
import { validateAuth } from '../../../util/middleware/validation-response';
// Define middleware function with Yup validation
export const registerOpts = (handler: (req: Request, res: Response, next: NextFunction) => void) => [
    validateAuth,
    handler,
  ];
  