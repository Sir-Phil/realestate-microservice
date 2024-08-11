import mongoose, { Document, Schema, model } from "mongoose";

// Property Interface
interface IProperty extends Document {
  property_id: string;
  name: string;
}

// Users Interface
interface IUsers extends Document {
  from: {
    user_id: string;
    keep: boolean;
  };
  to: {
    user_id: string;
    keep: boolean;
  };
}

// ReplyTo Interface
interface IReplyTo extends Document {
  enquiry_id: string;
  title: string;
  topic: string;
}

// Enquiry Interface
interface IEnquiry extends Document {
  enquiry_id: string;
  content: string;
  email: string;
  title: string;
  topic: string;
  read: boolean;
  property: IProperty;
  replyTo: IReplyTo;
  users: IUsers;
}

// Property Schema
const propertySchema = new Schema<IProperty>({
  property_id: { type: String, required: true },
  name: { type: String, required: true }
});

// Users Schema
const usersSchema = new Schema<IUsers>({
  from: {
    user_id: { type: String, required: true },
    keep: { type: Boolean, default: true, required: true }
  },
  to: {
    user_id: { type: String, required: true },
    keep: { type: Boolean, default: true, required: true }
  }
});

// ReplyTo Schema
const replyToSchema = new Schema<IReplyTo>({
  enquiry_id: { type: String, required: true },
  title: { type: String, required: true },
  topic: { type: String, required: true }
});

// Enquiry Schema
const enquirySchema = new Schema<IEnquiry>({
  enquiry_id: { type: String, required: true },
  content: { type: String, minlength: 10, required: true },
  email: { type: String, required: true, match: /.+\@.+\..+/ },
  title: { type: String, required: true },
  topic: { type: String, required: true },
  read: { type: Boolean, default: false },
  property: { type: propertySchema },
  replyTo: { type: replyToSchema },
  users: { type: usersSchema }
}, {
  timestamps: true
});

// Enquiry Model
const Enquiry = model<IEnquiry>('Enquiry', enquirySchema);

export default Enquiry;
