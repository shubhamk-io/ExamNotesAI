import mongoose, { Schema, Document, Types } from "mongoose";

interface IUser extends Document {
    name: string
    email: string
    password: string
    role?: "user" | "admin"
    credits: number
    notes?:Types.ObjectId[]
    isCreditAvailable: boolean
    createdAt: Date
    updatedAt: Date
}

const UserSchema: Schema<IUser> = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: false
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        credits: {
            type: Number,
            default: 50,
            min: 0
        },
        isCreditAvailable: {
            type: Boolean,
            default: true
        },
        notes: [{
            type: Schema.Types.ObjectId,
            ref: "Notes"
        }]
    },
    { timestamps: true }
);

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;