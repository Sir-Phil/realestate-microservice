import { Request, Response, NextFunction } from "express";
import { responseError, responseSuccess } from "../../../util/constants/response";
import { validateAuth } from "../../../util/middleware/validation-response";
import propertyProperties from "./schema";

const createPropertyOpts = (handler: (req: Request, res: Response, _next:NextFunction) => void) => {
    return [
        validateAuth,
        async (req: Request, res: Response, _next: NextFunction) => {
            try {
                await handler(req, res, _next);
                res.status(201).json(responseSuccess({
                    status: 201,
                    message: 'Enquiry Created!',
                    data: propertyProperties
                }));
            } catch (error) {
                res.status(400).json(responseError({
                    status:400,
                    message: "Error:Something went wrong, please try again later."
                })),
                res.status(401).json(responseError({
                    status: 401,
                    message: "No Authorization was found in request.header"
                }))
                res.status(404).json(responseError)
            }
        }
    ];
};

export default createPropertyOpts;

