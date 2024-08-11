import express from "express";
import { register, signIn } from "../../controller/auth";
import { registerOpts, signInOpts } from "./options";


const router = express.Router();

router.post("/register", registerOpts(register))
router.post("/signin", signInOpts(signIn));

export default router;