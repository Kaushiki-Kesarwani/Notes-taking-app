import React from "react";
import { Link } from "react-router";
import { DeleteIcon, PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const Notecard = ({ note }) => {
  const handleDelete = async (e) => {
    e.preventDefault();

    if (confirm("Are you sure you want to delete this note?")) {
      try {
        await api.delete(`/notes/${note._id}`);
        toast.success("Note deleted successfully!");
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete note.");
      }
    }
  };

  return (
    <Link
      to={`/notes/${note._id}`}
      className="block bg-base-100 p-5 rounded-2xl border border-base-300 shadow-[0_10px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.22)] transition-all duration-300"
    >
      <div className="card-body p-0">
        <h2 className="card-title text-base-content">{note.title}</h2>

        <p className="text-base-content/70 line-clamp-3 mt-2">
          {note.content}
        </p>

        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>

          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4 text-primary" />
        

          <button
  onClick={handleDelete}
  className="flex items-center justify-center w-9 h-9 rounded-full text-error hover:bg-error/15 hover:text-error transition-all duration-200 hover:scale-110 active:scale-95"
  title="Delete Note"
>
  <Trash2Icon className="size-4" />
</button>

            </div>
        </div>
      </div>
    </Link>
  );
};

export default Notecard;