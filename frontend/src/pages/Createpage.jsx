import React, { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("Personal");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      await api.post("/notes/add", {
        title,
        content,
        category,
        tags,
      });

      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);

      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast.", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = () => {
    const newTag = tagInput.trim();

    if (!newTag) return;

    if (tags.some((tag)=> tag.toLowerCase() === newTag.toLowerCase())) {
      toast.error("Tag already exists");
      return;
    }
    setTags([...tags, newTag]);
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove) => {
   setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.10),transparent_35%),linear-gradient(to_bottom,#0f172a,#111827,#1f2937)]" />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link to="/" className="btn btn-ghost gap-2 mb-8 hover:bg-base-300">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          {/* Card */}
          <div className="bg-base-100 border border-base-300 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-info bg-clip-text text-transparent mb-2">
              Create New Note
            </h1>

            <p className="text-base-content/70 mb-8">
              Capture your thoughts and ideas in one place.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="label">
                  <span className="label-text text-base font-semibold">
                    Title
                  </span>
                </label>

                <input
                  type="text"
                  placeholder="Enter note title..."
                  className="input input-bordered w-full h-12 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/*categories*/}

              <div className="form-control mb-5">
                <label className="label">
                  <span className="label-text font-semibold">Category</span>
                </label>

                <select
                  className="select select-bordered w-full"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Personal">Personal</option>
                  <option value="Study">Study</option>
                  <option value="Work">Work</option>
                  <option value="Important">Important</option>
                </select>
              </div>

              {/* tags */}

              <div className="form-control mb-5">
                <label className="label">
                  <span className="label-text font-semibold">Tags</span>
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    className="input input-bordered flex-1"
                    placeholder="Add a tag"
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

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {tags.map((tag) => (
                      <div
                        key={tag}
                        className="badge badge-primary gap-2 px-3 py-4"
                      >
                        {tag}

                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div>
                <label className="label">
                  <span className="label-text text-base font-semibold">
                    Content
                  </span>
                </label>

                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered w-full h-44 resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <Link to="/" className="btn btn-outline">
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary px-8 hover:scale-105 transition-transform"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Creating...
                    </>
                  ) : (
                    "Create Note"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
