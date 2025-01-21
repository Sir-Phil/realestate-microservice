import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import User from '../../models/user';

const getUser = asyncHandler(async(req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const user = await User.findOne({ user_id: id});
        if(!user){
            res.status(404).send({message: "Error: can't find user"})
        }
        res.send({ data: user});
    } catch (error) {
        res.send(error)
    }
});

export default getUser;