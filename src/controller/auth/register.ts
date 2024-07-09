import asyncHandler from "express-async-handler"
import { Request, Response, NextFunction } from "express";
import { isPasswordValid } from "../../util/users";
import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import User from "../../models/user";


/**
 * Registers a new user.
 * @async
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<Response>} A promise that resolves to the Express response object.
 */

const register = asyncHandler(async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const {fullName, email, password} = req.body;

    if(fullName && email && password){
        if(!isPasswordValid(password)){
             res.status(400).send({
                message: 'Error: password is not valid'
            });
            return
        }

        try {
            const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT) || 12);
            const newUser = new User({
                user_id: uuidv4(),
                fullName,
                email: email.toLowerCase(),
                password: hashedPassword,
            })
        } catch (error) {
            res.status(500).send({
                message: 'Error: Could not register use',
                error
            })
            return
        }
    }
    res.status(400).send({message: 'Error: form is invalid'})
})

export default register;