import mongoose, { Schema, Document, model, mongo } from "mongoose";



interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    role?: "user" | "admin",
    credits: Number,
    notes?: mongoose.Schema.Types.ObjectId[],
    isCreditAvailable: boolean,
    createdAT: Date,
    updatedAT: Date
};

const UserSchema: Schema<IUser> = new Schema<IUser>(
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
  required: false
},
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        credits: {
            type: Number,
            default: 50,
            min: 0,
        },
        isCreditAvailable: {
            type: Boolean,
            default: true,
        },
        notes: [{
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Notes",
            default: []
        }]
    },
    { timestamps: true }
);

const UserModel = mongoose.model("UserModel", UserSchema)

export default UserModel 