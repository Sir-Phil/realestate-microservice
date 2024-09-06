import { Request, Response, NextFunction } from 'express';
import { validateAuth } from '../../../util/middleware/validation-response';
import { responseError, responseSuccess } from '../../../util/constants/response';
import propertyProperties from './schema';


const getPropertiesOpts = (handler: ( req: Request, res: Response, _next: NextFunction) => void) => {
    return [
        validateAuth,
        async(req: Request, res: Response, _next: NextFunction) => {
            try {
                await handler(req, res, _next);
                res.status(200).json(responseSuccess({
                    data: {
                        type: "array",
                        items: propertyProperties
                    }
                }));
            } catch (error) {
                res.status(400).json(responseError())
            }
        }
    ];
};

export default  getPropertiesOpts;