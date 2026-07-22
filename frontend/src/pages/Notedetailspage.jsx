import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tagInput,setTagInput] = useState("");
   

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
     <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center gap-4">
  <LoaderIcon className="size-12 animate-spin text-primary" />
  <p className="text-base-content/70 font-medium">
    Loading your note...
  </p>
</div>
    );
  }


   const handleAddTag = () => {
      const newTag = tagInput.trim();
  
      if (!newTag) return;
  
      if (note.tags?.some((tag)=> tag.toLowerCase() === newTag.toLowerCase())) {
        toast.error("Tag already exists");
        return;
      }
      setNote({...note, tags: [...(note.tags || []), newTag]});
      setTagInput("");
    };
  
    const handleRemoveTag = (tagToRemove) => {
     setNote({...note, tags:note.tags.filter((tag) => tag !== tagToRemove)});
    };
  
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleAddTag();
      }
    };

  return (
    <div className="min-h-screen bg-base-200 relative">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost gap-2 hover:bg-base-300 transition-all">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline hover:scale-105 transition-all duration-200">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="bg-base-100 border border-base-300 rounded-3xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
            <div className="card-body p-8">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered w-full h-12 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>



              {/* Category */}

<div className="form-control mb-4">
  <label className="label">
    <span className="label-text">Category</span>
  </label>

  <select
    className="select select-bordered w-full"
    value={note.categories || "Personal"}
    onChange={(e) =>
      setNote({
        ...note,
        categories: e.target.value,
      })
    }
  >
    <option value="Personal">Personal</option>
    <option value="Study">Study</option>
    <option value="Work">Work</option>
    <option value="Important">Important</option>
  </select>
</div>


<div className="form-control mb-4">
  <label className="label">
    <span className="label-text">Tags</span>
  </label>

  {/* Input Row */}
  <div className="flex gap-2">
    <input
      type="text"
      placeholder="Add a tag"
      className="input input-bordered flex-1"
      value={tagInput}
      onChange={(e) => setTagInput(e.target.value)}
      onKeyDown={handleKeyDown}
    />

    <button
      type="button"
      className="btn btn-primary"
      onClick={handleAddTag}
    >
      Add
    </button>
  </div>

  {/* Tags Row */}
  {note.tags?.length > 0 && (
    <div className="flex flex-wrap gap-2 mt-4">
      {note.tags.map((tag) => (
        <div
          key={tag}
          className="badge badge-primary gap-2 px-3 py-4"
        >
          {tag}

          <button
            type="button"
            className="ml-1 shrink-0"
            onClick={() => handleRemoveTag(tag)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )}
</div>

  





              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-52 w-full resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary px-8 hover:scale-105 transition-all duration-200" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NoteDetailPage;