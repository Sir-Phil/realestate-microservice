import express from "express";
import { register, signIn } from "../../controller/auth";
import { registerOpts, signInOpts } from "./options";


const authRouter = express.Router();

authRouter.post("/register", registerOpts(register))
authRouter.post("/signin", signInOpts(signIn));

export default authRouter;