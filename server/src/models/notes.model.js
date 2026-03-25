import mongoose from "mongoose";

const { Schema } = mongoose;

const NotesSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // ⚠️ model name same hona chahiye
      required: true,
    },

    topic: {
      type: String,
      required: true,
    },

    classLevel: {
      type: String,
    },

    examType: {
      type: String,
    },

    revisionMode: {
      type: Boolean,
      default: false,
    },

    includeDiagram: {
      type: Boolean,
      default: false,
    },

    includeCharts: {
      type: Boolean,
      default: false,
    },

    content: {
      type: Schema.Types.Mixed, // AI response data
    },
  },
  { timestamps: true }
);

const Notes = mongoose.model("Notes", NotesSchema);

export default Notes;