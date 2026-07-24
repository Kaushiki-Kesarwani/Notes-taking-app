import React from "react";
import { Link } from "react-router";
import { PenSquareIcon, Trash2Icon,PinIcon } from "lucide-react";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const Notecard = ({ note, setNotes }) => {
  const handleDelete = async (e) => {
    e.preventDefault();

    if (confirm("Are you sure you want to delete this note?")) {
      try {
        await api.delete(`/notes/${note._id}`);
        toast.success("Note deleted successfully!");
        setNotes((prev) => prev.filter((n) => n._id !== note._id));
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete note.");
      }
    }
  };

  const categoryColor = {
  Personal: "badge-success",
  Study: "badge-info",
  Work: "badge-secondary",
  Important: "badge-error",
};

const handleTogglePin = async (e) =>{
  e.stopPropagation();
  e.preventDefault();

  const previousPinned = note.isPinned;

  setNotes((prevNotes)=>prevNotes.map((n) => n._id === note._id?{ ...n, isPinned: !n.isPinned }
        : n));

        try{
          await api.patch(`/notes/${note._id}/pin`);
        }catch(err){
           console.log(error);

    // Rollback UI
    setNotes((prevNotes) =>
      prevNotes.map((n) =>
        n._id === note._id
          ? { ...n, isPinned: previousPinned }
          : n
      )
    );

    toast.error("Failed to update pin.");
        }
}

  return (
    <Link
      to={`/notes/${note._id}`}
      className="block bg-base-100 p-5 rounded-2xl border border-base-300 shadow-[0_10px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.22)] transition-all duration-300"
    >

      <div className="card-body p-0">
        <h2 className="card-title text-base-content mb-2">{note.title}</h2>


      <div className="mt-2">
  <span
    className={`badge ${
      categoryColor[note.categories] || "badge-neutral"
    }`}
  >
    {note.categories}
  </span>
</div>

{note.tags?.length > 0 && (
  <div className="flex flex-wrap gap-2 mt-3">
    {note.tags.slice(0, 3).map((tag) => (
      <span
        key={tag}
        className="badge badge-outline badge-sm max-w-full truncate"
      >
        #{tag}
      </span>
    ))}

    {note.tags.length > 3 && (
      <span className="badge badge-outline badge-sm">
        +{note.tags.length - 3}
      </span>
    )}
  </div>
)}

        <p className="text-base-content/70 line-clamp-3 mt-2">{note.content}</p>

        <div className="card-actions justify-between items-center mt-5 pt-4 border-t border-base-300">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>

         <div className="flex items-center gap-1">

  <button
    onClick={handleTogglePin}
    className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 hover:scale-110 ${
      note.isPinned
        ? "text-warning bg-warning/20"
        : "text-base-content/50 hover:bg-base-300"
    }`}
    title={note.isPinned ? "Unpin Note" : "Pin Note"}
  >
    <PinIcon
      className="size-4"
      fill={note.isPinned ? "currentColor" : "none"}
    />
  </button>

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
