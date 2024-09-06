import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import { authBearerToken } from '../../util/requests';
import { userIdToken } from '../../util/users';
import Property from '../../models/property';
import User from '../../models/user';
import { unlinkImages } from './image-property';


const deleteProperty = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    try {

        const token = authBearerToken(req);
        const user_id = userIdToken(token);
        
        const property = await Property.findOneAndDelete({property_id: id, user_id});
        if(!property){
            res.status(404).send({});
        }
        if (property?.images.length){
            unlinkImages(property.images);
        }

        const user = await User.findOne({ user_id });
        user!.properties = user!.properties.filter( i => i !== property?.property_id);
        user?.save();

        res.status(200).send({
            data: {... property?.toObject()}
        });
    } catch (error) {
        res.send(error)
    }
});

export default deleteProperty;