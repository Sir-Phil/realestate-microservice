import { Document, Schema, model } from "mongoose";

interface IUser extends Document {
    user_id: string,
    fullName: string,
    email: string,
    password: string,
    property: Array<string>
}

const userSchema = new Schema<IUser> ({
    user_id: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        minlength: 4,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true
    },
    password: {
        type: String,
    },
    property: { 
        type: [String]
    }
})


const User = model<IUser>('User', userSchema)

export default User


