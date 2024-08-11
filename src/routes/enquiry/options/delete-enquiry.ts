import { Request, Response, NextFunction } from "express";
import { validateAuth } from "../../../util/middleware/validation-response";
import { responseError, responseSuccess } from "../../../util/constants/response";
import enquiryProperties from "./schema";


const deleteEnquiryOpts = (handler: (req: Request, res: Response, next: NextFunction) => void) => {
    return [
      validateAuth,  
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          await handler(req, res, next);
          res.status(200).json(responseSuccess({
            message: "Enquiry deleted!",
            data: enquiryProperties
          }));
        } catch (error) {
          if (error instanceof Error) {  // Type guard to narrow down the error type
            if ((error as any).status === 404) {
              res.status(404).json(responseError({
                status: 404,
                message: "Can't find Enquiry."
              }));
            } else {
              res.status(400).json(responseError());
            }
          } else {
            // Handle case where error is not an instance of Error
            res.status(500).json({ message: "An unexpected error occurred" });
          }
        }
      }
    ];
  };

  export default deleteEnquiryOpts;

