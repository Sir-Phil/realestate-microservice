import { Request, Response, NextFunction } from 'express';
import { responseError, responseSuccess } from '../../../util/constants/response';
import propertyProperties from './schema';

const getPropertyOpts = (handler: (req: Request, res: Response, ) => void) => {
    return async (req: Request, res: Response) => {
        try {
            await handler( req, res);
            res.status(200).json(responseSuccess({ data: propertyProperties}));
        } catch (error) {
            if((error as any).status === 404) {
                res.status(404).json(responseError({ status: 404, message: "Error: Can't find Enquiry."}));
            }else {
                res.status(400).json(responseError());
            };
        };
    }
}

export default getPropertyOpts;