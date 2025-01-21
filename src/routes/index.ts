import express, { Application, Request,Response } from "express";
import userRouter from "./auth/indext";
import enquiryRouter from "./enquiry";
import propertyRouter from "./property";



const app: Application = express()

const setExpressRoute = (app: Application) => {
    app.get("/", (_: Request, res: Response) => {
        res.send(true);
    });

    app.use("/users", userRouter);
    app.use("/auth", userRouter);
    app.use("/enquiries", enquiryRouter);
    app.use("/properties", propertyRouter);
}

export default setExpressRoute;
