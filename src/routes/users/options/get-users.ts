import { Request, Response, NextFunction } from 'express';
import { validateAuth } from '../../../util/middleware/validation-response';
import { responseError, responseSuccess } from '../../../util/constants/response';
import {  usersProperties } from './schema';


// schema for multiple users request

const getUsersOpts = (handler: ( req: Request, res: Response, next: NextFunction) => void) => {
    return [
        validateAuth,
        async(req: Request, res: Response, next: NextFunction) => {
            try {
                await handler(req, res, next);
                res.status(200).json(responseSuccess({
                    data: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: usersProperties
                        }
                    }
                }));
            } catch (error) {
                res.status(400).json(responseError())
            }
        }
    ];
};

export default getUsersOpts