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

    categories: {
        type:String,
        default:"personal"
    },

    tags: {
        type:[String],
        default:[]
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    isPinned:{
        type:Boolean,
        default:false
    }

},
{
    timestamps: true,
}
);

export const Note = mongoose.model("Note", NotesSchema);

