import { Request, Response, NextFunction } from 'express';
import { validateAuth } from '../../../util/middleware/validation-response';
import { responseError, responseSuccess } from '../../../util/constants/response';

// Define the handler options
export const signInOpts = (handler: (req: Request, res: Response, next: NextFunction) => void) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Call the handler function
      await handler(req, res, next);
      
      // Example success response
      res.status(200).json(responseSuccess({
        data: validateAuth, // Assuming you want to include authProperties in the response
        message: "Success: User signed in successfully!"
      }));
    } catch (error) {
      // Handle errors properly with type assertions
      if (error instanceof Error) {
        // Example error handling
        if ((error as any).status === 404) {
          res.status(404).json(responseError({ status: 404, message: "Resource not found" }));
        } else {
          res.status(400).json(responseError());
        }
      } else {
        // Handle unexpected error types
        res.status(500).json(responseError({ status: 500, message: "Internal server error"}));
      }
    }
  };
};
