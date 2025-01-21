import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import { authBearerToken } from '../../util/requests';
import { userIdToken } from '../../util/users';
import User from '../../models/user';

const getMe = asyncHandler(async(req: Request, res: Response) => { 
    const token = authBearerToken(req);
    const user_id = userIdToken(token);
    try {
        const user = await User.findOne({ user_id });
        res.send({ data: user});
    } catch (error) {
        res.send(error);
    }
})


export default getMe;