import express from "express";
import { getEnquiriesOpts, getEnquiryOpts } from "./options";
import { getEnquiries } from "../../controller/enuiries";


const router = express.Router();

router.get("/", getEnquiriesOpts(getEnquiries));
router.get("/:id", getEnquiryOpts)