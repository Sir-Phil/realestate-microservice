import asyncHandler from "express-async-handler";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { authBearerToken } from "../../util/requests";
import { isPasswordValid, userIdToken } from "../../util/users";
import User from "../../models/user";

// Define the request and response types for better type checking
const changePassword = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { passwordCurrent, passwordNew } = req.body;

    if (!passwordCurrent) {
         res.status(400).send({
            message: 'Error: form is invalid, current password is missing'
        })
        return
    }
    if (!passwordNew) {
        res.status(400).send({
            message: 'Error: form is invalid, new password is missing'
        });
        return 
    }
    if (passwordCurrent === passwordNew) {
        res.status(400).send({
            message: 'Error: new password cannot be the same as your current password. Please choose a different password',
        });
        return 
    }

    const token = authBearerToken(req);
    const user_id = userIdToken(token);

    const foundUser = await User.findOne({ user_id });
    if (!foundUser) {
         res.status(404).send({
            message: "We can't find the user",
        });
        return
    }

    const validPasswordCurrent = await bcrypt.compare(passwordCurrent, foundUser.password);
    if (!validPasswordCurrent) {
        res.status(400).send({
            message: 'Error: Current password is not valid'
        });
        return 
    }

    if (!isPasswordValid(passwordNew)) {
       res.status(400).send({
            message: 'Error: New password is not valid'
        });
        return 
    }

    const hashedPassword = await bcrypt.hash(passwordNew, Number(process.env.SALT) || 12);
    foundUser.password = hashedPassword;
    await foundUser.save();

    res.status(200).send({});
});

export default changePassword;
