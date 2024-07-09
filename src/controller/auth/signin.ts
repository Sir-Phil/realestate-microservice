import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt'
import  Jwt  from "jsonwebtoken";
import User from "../../models/user";

const signIn = asyncHandler(async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const {email, password} = req.body;

    try {
        const foundUser = await User.findOne({email: email.toLowerCase() });
        if(!foundUser){
            res.status(400).send({
                message: 'Error: Invalid Email or Password',
            });
            return
        }

        const validPassword = await bcrypt.compare(
            password, 
            foundUser.password
        );
        if(!validPassword){
            res.status(400).send({
                message: 'Error: Invalid Email or Password'
            });
            return
        }

        const user_id = foundUser;
        const accessToken = Jwt.sign({id: user_id}, process.env.SECRET_KEY as string || 'secret' );
        res.status(200).send({
            Data: {
                id: foundUser.id,
                user_id: foundUser.user_id,
                fullName: foundUser.fullName,
                email: foundUser.email,
                accessToken,
            },
        });
    } catch (error) {
        res.status(404).send({
            message: 'Error: Something went wrong.'
        });
        return
    }
})

export default signIn;