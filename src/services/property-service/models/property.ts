import mongoose, { Document } from "mongoose";

interface IProperty extends Document{
    property_id: string,
    name: string,
    address: string,
    description: string,
    type: string,
    position: string,
    price: number,
    features: Array<string>,
    profileImage: string,
    images: string,
    currency: string,
    contactNumber: string,
    contactEmail: string,
    user_id : mongoose.Types.ObjectId | string,
}

