import { Document } from "mongoose";

interface IEnquiry extends Document{
    enquiry_id: string,
    content: string,
    email: string,
    title: string,
    topic: string,
    read: string,
}

interface IReplyTo extends Document {
    title: string,
    topic: string
}