import mongoose, { Document, Schema, model } from "mongoose";

interface IProperty extends Document{
    property_id: string,
    name: string,
    address: string,
    description: string,
    type: string,
    position: {
        lat: number,
        lng: number
    },
    price: number,
    features: Array<string>,
    profileImage: string,
    images: string,
    currency: string,
    contactNumber: string,
    contactEmail: string,
    user_id : mongoose.Types.ObjectId | string,
}

const propertySchema = new Schema ({
    property_id : {
        type: String,
        required: true
    },
    name: {
        type: String,
        minlength: 4,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        minlength: 10,
    },
    position: {lat: Number, lng: Number},
    features: {
        type: Array,
    },
    profileImage: {
        type: String
    },
    images: {
        type: Array
    },
    currency: {
        type: String
    },
    contactNumber: {
        type: String,
    },
    contactEmail: {
        type: String
    },
    user_id: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
} ,  {
    timestamps: true
})

const Property = model<IProperty>('Property', propertySchema)

export default Property