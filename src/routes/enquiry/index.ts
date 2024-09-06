import express from "express";
import { createEnquiryOpts, deleteEnquiryOpts, getEnquiriesOpts, getEnquiryOpts, updateEnquiryOpts } from "./options";
import { createEnquiry, deleteEnquiry, getEnquiries, updateEnquiry } from "../../controller/enuiries";


const enquiryRouter = express.Router();

enquiryRouter.get("/", getEnquiriesOpts(getEnquiries));
enquiryRouter.get("/:id", getEnquiryOpts);
enquiryRouter.post("/", createEnquiryOpts(createEnquiry));
enquiryRouter.patch("/:id", updateEnquiryOpts(updateEnquiry));
enquiryRouter.delete("/:id", deleteEnquiryOpts(deleteEnquiry));

export default enquiryRouter;