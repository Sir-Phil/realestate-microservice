import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import authProperty from '../../routes/auth/options/schema';

// Middleware function to validate request data using Yup
const validateYupSchema = (schema: yup.ObjectSchema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (err) {
      // Type assertion for Yup ValidationError
      if (err instanceof yup.ValidationError) {
        return res.status(400).json({ errors: err.errors });
      } else {
        // Handle unexpected errors
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  };
};

// Create validation middleware specific for auth
export const validateAuth = validateYupSchema(authProperty);
