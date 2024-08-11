import { Request, Response, NextFunction } from 'express';
import { authBearerToken } from '../../../util/requests';
import { userIdToken } from '../../../util/users';
import { responseError, responseSuccess } from '../../../util/constants/response';
import enquiryProperties from './schema';

const updateEnquiryOpts = (
    handler: (req: Request, res: Response, next: NextFunction) => Promise<void>
  ) => [
    (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = authBearerToken(req);
        const userId = userIdToken(token);
        // Additional validation logic can be added here.
        next();
      } catch (error) {
        res
          .status(401)
          .json(responseError({ status: 401, message: 'Unauthorized' }));
      }
    },
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await handler(req, res, next);
        res.status(201).json(
          responseSuccess({
            message: 'Enquiry updated!',
            data: enquiryProperties,
          })
        );
      } catch (error) {
        // Assert the type of 'error' to access its properties
        const err = error as { status?: number; message?: string };
  
        if (err.status === 404) {
          res.status(404).json(
            responseError({ status: 404, message: "Error: Can't find Enquiry." })
          );
        } else {
          res.status(400).json(
            responseError({
              status: err.status || 400,
              message: err.message || 'Bad Request',
            })
          );
        }
      }
    },
  ];

  export default updateEnquiryOpts;