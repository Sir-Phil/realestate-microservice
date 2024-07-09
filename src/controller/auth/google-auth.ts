import asyncHandler from "express-async-handler"
import { Request, Response } from 'express';
import  jwt  from "jsonwebtoken";
import User from "../../models/user";


const googleAuth = asyncHandler (async(req: Request, res: Response): Promise<void> => {
    const {credential } = req.body;

    if(!credential) {
        res.status(400).send({
            message: 'Error: Invalid request'
        });
        return
    }
    const decoded: any = jwt.decode(credential);

    if(!decoded){
        res.status(400).send({
            message: 'Error: Invalid credential'
        });
        return
    }

    const {sub, email, name: fullName, aud, iss, exp, picture} = decoded;

    if(process.env.GOOGLE_AUTH_CLIENT_ID !== aud) {
        // Invalid client id
        res.status(400).send({
            message: 'Error: Invalid Request'
        });
        return
    }

    if( iss !== 'account.google.com' && iss !== 'https://accounts.google.com'){
    //Source is Invalid
    res.status(400).send({
        message: 'Error: Invalid Request'
    });
    return
    }

    if (exp < Date.now()/ 1000){
        //Token is expired
        res.status(400).send({
            message: 'Error Invalid Request'
        });
        return
    }

    let foundUser = await User.findOne({user_id: sub});
    let id = foundUser?.id;
    let accessToken = '';

    if(!foundUser){
        // Google Sign-in for the first time, create a new user
        console.log('Google Sign-in creating new user...');
        const newUser = new User({
            user_id: sub,
            fullName,
            email: email.toLowerCase(),
        });
        const user = await newUser.save()
        id = user.id;
        foundUser = user;
    }

    accessToken = jwt.sign({ id: sub}, process.env.SECRET_KEY || 'secret');

    res.status(200).send({
        id,
        user_id: sub,
        fullName,
        email,
        accessToken,
    });
})


export default googleAuth;


