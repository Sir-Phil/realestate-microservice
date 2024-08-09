import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import Enquiry from '../../models/enquiry';
import { authBearerToken } from '../../util/requests';
import { userIdToken } from '../../util/users';

const getEnquiries = asyncHandler (async ( req: Request, res: Response) => {
    const token = authBearerToken(req);
    const user_id = userIdToken(token);

    try {
        const list = await Enquiry.find({
            $or: [
                {'users.from.user_id': user_id, 'users.from.keep': true},
                {' users.to.user_id' : user_id, 'users.to.keep': true},
            ]
        });
        res.status(200).send({data: list});
        return;
    } catch (error) {
        res.status(400).send(error);
        return;
    }
})

export default getEnquiries;