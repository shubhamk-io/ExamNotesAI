import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: false,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        credits: {
            type: Number,
            default: 20,
            min: 0,
        },
        isCreditAvailable: {
            type: Boolean,
            default: true,
        },
        notes: [
            {
                type: Schema.Types.ObjectId,
                ref: "Notes",
            },
        ],
    },
    { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;