import { Request, Response, NextFunction } from "express";
import { validateAuth } from "../../../util/middleware/validation-response";
import enquiryProperties from "./schema";
import { responseError, responseSuccess } from "../../../util/constants/response";

const createEnquiryOpts = (handler: (req: Request, res: Response, next:NextFunction) => void) => {
    return [
        validateAuth,
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await handler(req, res, next);
                res.status(201).json(responseSuccess({
                    status: 201,
                    message: 'Enquiry Created!',
                    data: enquiryProperties
                }));
            } catch (error) {
                res.status(404).json(responseError)
            }
        }
    ];
};

export default createEnquiryOpts

