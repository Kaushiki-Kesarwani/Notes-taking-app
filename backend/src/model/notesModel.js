import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

},
{
    timestamps: true,
}
);

export const Note = mongoose.model("Note", NotesSchema);

