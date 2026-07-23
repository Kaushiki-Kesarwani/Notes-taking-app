import  { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RatelimitedUI";
import toast from "react-hot-toast";
import Notecard from "../components/Notecard";
import api from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";

const Homepage = () => {
  const [isRatelimited, setIsRatelimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [search, setSearch] = useState("");



  const fetchNotes = async () => {
    const trimmedSearch = search.trim();

    try {
      if (loading) {
        setLoading(true);
      } else if (trimmedSearch) {
        setSearching(true);
      }

      const response = await api.get("/notes", {
        params: trimmedSearch ? { search: trimmedSearch } : {},
      });

      setNotes(response.data);
      setIsRatelimited(false);
    } catch (error) {
      console.log(error);

      if (error.response?.status === 429) {
        setIsRatelimited(true);
      } else {
        toast.error("Failed to fetch notes");
      }
    } finally {
      setLoading(false);
      setSearching(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchNotes();
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);


  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="🔍 Search notes..."
            className="input input-bordered flex-1 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button
              className="btn btn-outline w-full sm:w-auto"
              onClick={() => setSearch("")}
            >
              Clear
            </button>
          )}
        </div>

        {/* Rate Limited */}
        {isRatelimited && <RateLimitedUI />}

        {/* Initial Loading */}
        {loading && !isRatelimited && (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}

        {/* Searching */}
        {!loading && searching && search.trim() && (
          <div className="flex items-center justify-center gap-2 py-4">
            <span className="loading loading-spinner loading-sm"></span>
            <p className="text-base-content/70">
              Searching for{" "}
              <span className="font-semibold">"{search}"</span>...
            </p>
          </div>
        )}

        {/* Notes Grid */}
        {!loading &&
          !searching &&
          notes.length > 0 &&
          !isRatelimited && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {notes.map((note) => (
                <Notecard
                  key={note._id}
                  note={note}
                  setNotes={setNotes}
                />
              ))}
            </div>
          )}

        {/* No Search Results */}
        {!loading &&
          !searching &&
          notes.length === 0 &&
          search.trim() &&
          !isRatelimited && (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold">No notes found</h2>
              <p className="text-base-content/70 mt-2">
                No notes match{" "}
                <span className="font-semibold">"{search}"</span>
              </p>
            </div>
          )}

        {/* User Has No Notes */}
        {!loading &&
          !searching &&
          notes.length === 0 &&
          !search.trim() &&
          !isRatelimited && <NotesNotFound />}
      </div>
    </div>
  );
};

export default Homepage;