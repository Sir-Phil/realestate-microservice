import { Request, Response, NextFunction } from 'express';
import { responseError, responseSuccess } from '../../../util/constants/response';
import enquiryProperties from './schema';



const getEnquiryOpts = (handler: (req: Request, res: Response, next: NextFunction) => void) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await handler(req, res, next);
        res.status(200).json(responseSuccess({ data: enquiryProperties }));
      } catch (error) {
        if ((error as any).status === 404) {
          res.status(404).json(responseError({ status: 404, message: "Error: Can't find Enquiry." }));
        } else {
          res.status(400).json(responseError());
        }
      }
    };
  };

  export default getEnquiryOpts