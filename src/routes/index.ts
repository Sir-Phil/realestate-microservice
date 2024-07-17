import express, { Application, Request,Response } from "express";
import userRouter from "./auth/indext";



const app: Application = express()

export const setExpressRoute = (app: Application) => {
    app.get("/", (_: Request, res: Response) => {
        res.send(true);
    });

    app.use("/auth", userRouter);
}
