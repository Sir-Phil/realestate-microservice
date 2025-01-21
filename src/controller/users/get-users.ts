import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import User from '../../models/user';

const getUsers = asyncHandler(async(req: Request, res: Response) => {
    const users = await User.find();
    res.status(200).send({ data: users});
})

export default getUsers