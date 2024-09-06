import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import Property from '../../models/property';

const getProperty = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    try {
        const property = await Property.findOne({ property_id: id});
        res.status(200).send({data: property});
    } catch (error) {
        res.status(400).send({})
    }
});

export default getProperty;
