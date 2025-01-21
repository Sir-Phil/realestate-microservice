import express from "express";
import { getUserOpts, getUsersOpts } from "./options";
import { getMe, getUser, getUsers } from "../../controller/users";


const usersRouter = express.Router();

usersRouter.get("/", getUsersOpts(getUsers));
usersRouter.get("/:id", getUserOpts(getUser));
usersRouter.get("/me", getUserOpts(getMe));
