import express from "express";
import { register, signIn } from "../../controller/auth";
import { registerOpts, signInOpts } from "./options";


const userRouter = express.Router();

userRouter.post("/register", registerOpts(register))
userRouter.post("/signin", signInOpts(signIn));

export default userRouter;