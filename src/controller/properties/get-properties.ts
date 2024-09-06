import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import Property from '../../models/property';

const getProperties = asyncHandler(async(_req: Request, res: Response, _next: NextFunction) => {
    const properties = await Property.find();
    res.status(200).
    send({data: properties});
});


export default getProperties;
