import { Request, Response, NextFunction } from "express";
import { validateAuth } from "../../../util/middleware/validation-response";
import { responseError, responseSuccess } from "../../../util/constants/response";
import propertyProperties from "./schema";


const updatePropertyOpts = (
    handler: (req: Request, res: Response, next: NextFunction) => void
  ) => [
    // Authentication middleware
    validateAuth,
    // Main handler
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        // Execute handler
        await handler(req, res, next);
        // On success, send 201 response with property data
        res.status(201).json(
          responseSuccess({
            status: 201,
            data: propertyProperties
          })
        );
      } catch (error) {
        const err = error as { status?: number; message?: string };
  
        if (err.status === 404) {
          res.status(404).json(
            responseError({
              status: 404,
              message: "Error: Property not found!"
            })
          );
        } else {
          res.status(400).json(
            responseError({
              status: err.status || 400,
              message: err.message || 'Bad Request'
            })
          );
        }
      }
    }
  ];

  export default updatePropertyOpts