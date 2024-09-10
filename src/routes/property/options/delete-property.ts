import { Request, Response, NextFunction } from "express";
import { validateAuth } from "../../../util/middleware/validation-response";
import { responseError, responseSuccess } from "../../../util/constants/response";
import propertyProperties from "./schema";


const deletePropertyOpts = (handler: any) => {
    return [
      validateAuth, // Authentication middleware
      (req: Request, res: Response) => {
        handler(req, res)
          .then(() => {
            res.status(200).json(responseSuccess({
              message: "Property deleted!",
              data: propertyProperties
            }));
          })
          .catch((err: any) => {
            if (err.status === 404) {
              return res.status(404).json(responseError({
                status: 404,
                message: "Error: Property not found!",
              }));
            }
            res.status(400).json(responseError());
          });
      }
    ];
  };

  export default deletePropertyOpts;