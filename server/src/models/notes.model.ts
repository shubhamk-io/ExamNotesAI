import mongoose, { Schema, Document } from "mongoose";

interface INotes extends Document {
    user: mongoose.Types.ObjectId;
    topic: string;
    classLevel?: string;
    examType?: string;
    revisionMode?: boolean;
    includeDiagram?: boolean;
    includeCharts?: boolean;
    content?: any;
 
createdAt: Date;   // ✅ add this
    updatedAt: Date;
}

const NotesSchema: Schema<INotes> = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel",
            required: true
        },

        topic: {
            type: String,
            required: true
        },

        classLevel: {
            type: String
        },

        examType: {
            type: String
        },

        revisionMode: {
            type: Boolean,
            default: false
        },

        includeDiagram: {
            type: Boolean,
            default: false
        },

        includeCharts: {
            type: Boolean,
            default: false
        },

        content: {
            type: mongoose.Schema.Types.Mixed  // AI response data
        }

    },
    { timestamps: true }
);

const Notes = mongoose.model<INotes>("Notes", NotesSchema);

export default Notes;