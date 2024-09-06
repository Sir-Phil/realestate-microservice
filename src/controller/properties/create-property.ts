import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import { authBearerToken } from '../../util/requests';
import { userIdToken } from '../../util/users';
import { v4 as uuidV4 } from 'uuid';
import Property from '../../models/property';
import User from '../../models/user';


const createProperty = asyncHandler(async( req: Request, res: Response, next: NextFunction) => {
    const {name, address, type, position} = req.body;
    if(!name || !address || !type || !position) {
        res.status(400).send({
            message: "Error: Required field are missing."
        });
    }
    const token = authBearerToken(req);
    const user_id = userIdToken(token);

    try {
        const newProperty = new Property({
            property_id: uuidV4(),
            user_id,
            ...req.body,
        });

        const user = await User.findOne({user_id });
        user?.properties.push(newProperty.property_id);

        await newProperty.save();
        await user?.save();

        res.status(201).send({
            data: newProperty
        })
    } catch (error) {
        res.send(error);
    }
})

export default createProperty;