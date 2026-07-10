import React, { useEffect } from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RatelimitedUI'
import toast from 'react-hot-toast';
import Notecard from '../components/Notecard';
import api from '../lib/axios';
import NotesNotFound from '../components/NotesNotFound';

const Homepage = () => {
  const[isRatelimited, setIsRatelimited] = useState(false);
  const[notes, setNotes] = useState([]);
  const[loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const response = await api.get("/notes");
        setNotes(response.data);
        console.log(response.data);
        setIsRatelimited(false);
      } catch (error) {
  console.log(error.response?.status);
  if (error.response?.status === 429) {
    console.log("Rate limit reached");
    setIsRatelimited(true);
  } else {
    toast.error("Failed to fetch notes");
  }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
    <Navbar/>
    {isRatelimited && <RateLimitedUI />}
   <div className="max-w-7xl mx-auto p-4 mt-6">
  {loading && (
    <div className="text-center text-lg font-semibold">
      Loading notes...
    </div>
  )}

  {notes.length === 0  && !isRatelimited && <NotesNotFound /> }

  {!loading && notes.length > 0 && !isRatelimited && (
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

  {!loading && notes.length === 0 && !isRatelimited && (
    <div className="text-center text-base-content/70 text-lg mt-10">
      No notes found.
    </div>
  )}
</div>
    </div>
  )
}

export default Homepage