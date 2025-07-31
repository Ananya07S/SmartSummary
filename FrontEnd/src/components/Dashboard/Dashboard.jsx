import React, { useState, useEffect, useCallback } from "react";
import NotesCard from "./NotesCard";

function Dashboard() {
  const [notesData, setNotesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const getNotesData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      
      console.log("Fetching all notes");
      
      const response = await fetch("http://localhost:5050/notes");
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Server response:", response.status, errorData);
        throw new Error(`Server error: ${response.status} ${errorData.error || ''}`);
      }
      
      const data = await response.json();
      console.log(`Loaded ${data.length} notes successfully`);
      setNotesData(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setError(`Failed to load notes. ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteNoteWithId = async (id) => {
    if (window.confirm("This action will delete the notes from your account!")) {
      try {
        const response = await fetch("http://localhost:5050/notes/delete", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete note');
        }
        
        // Update local state after successful deletion
        const updatedNotes = notesData.filter(note => note._id !== id);
        setNotesData(updatedNotes);
      } catch (error) {
        console.error("Error deleting note:", error);
        setError("Failed to delete note. Please try again.");
        // Clear error after 3 seconds
        setTimeout(() => setError(""), 3000);
      }
    }
  };

  useEffect(() => {
    getNotesData();
  }, [getNotesData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-col p-4">
      <h1 className="my-2 text-center text-4xl text-gray-700 font-bold">
        All Meeting Notes..
      </h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4">
          {error}
        </div>
      )}
      
      <p className="m-6 font-bold text-gray-700">
        Total Meeting(s): {notesData.length}
      </p>
      
      <div className="mt-6 flex justify-center lg:justify-start flex-wrap">
        {notesData.length ? (
          notesData.map((note) => (
            <NotesCard
              key={note._id}
              data={{
                id: note._id,
                title: note.title,
                duration: note.duration,
                created_at: note.createdAt
              }}
              deleteNoteWithId={deleteNoteWithId}
            />
          ))
        ) : (
          <div className="text-center w-full">
            <h1 className="text-3xl font-bold mt-6 text-gray-800">
              No Meeting Notes available!
            </h1>
            <p className="text-gray-600 mt-4">
              Upload an audio recording or transcript to generate meeting notes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

/*import React, { useState, useEffect, useCallback } from "react";
import NotesCard from "./NotesCard";

function Dashboard({ user }) {
  const [notesData, setNotesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const getNotesData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      
      // Make sure user is authenticated
      if (!user || !user.email) {
        throw new Error('User not authenticated');
      }
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      console.log("Fetching notes for:", user.email);
      
      const response = await fetch("http://localhost:5050/notes", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Server response:", response.status, errorData);
        throw new Error(`Server error: ${response.status} ${errorData.error || ''}`);
      }
      
      const data = await response.json();
      console.log(`Loaded ${data.length} notes successfully`);
      setNotesData(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setError(`Failed to load your notes. ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const deleteNoteWithId = async (id) => {
    if (window.confirm("This action will delete the notes from your account!")) {
      try {
        const token = localStorage.getItem('token');
        
        const response = await fetch("http://localhost:5050/notes/delete", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ id })
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete note');
        }
        
        // Update local state after successful deletion
        const updatedNotes = notesData.filter(note => note._id !== id);
        setNotesData(updatedNotes);
      } catch (error) {
        console.error("Error deleting note:", error);
        setError("Failed to delete note. Please try again.");
        // Clear error after 3 seconds
        setTimeout(() => setError(""), 3000);
      }
    }
  };

  useEffect(() => {
    if (user && user.email) {
      getNotesData();
    } else {
      setLoading(false);
      setError("Please log in to view your notes");
    }
  }, [getNotesData, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-col p-4">
      <h1 className="my-2 text-center text-4xl text-gray-700 font-bold">
        All Meeting Notes
      </h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4">
          {error}
        </div>
      )}
      
      <p className="m-6 font-bold text-gray-700">
        Total Meeting(s): {notesData.length}
      </p>
      
      <div className="mt-6 flex justify-center lg:justify-start flex-wrap">
        {notesData.length ? (
          notesData.map((note) => (
            <NotesCard
              key={note._id}
              data={{
                id: note._id,
                title: note.title,
                duration: note.duration,
                created_at: note.createdAt
              }}
              deleteNoteWithId={deleteNoteWithId}
            />
          ))
        ) : (
          <div className="text-center w-full">
            <h1 className="text-3xl font-bold mt-6 text-gray-800">
              No Meeting Notes available!
            </h1>
            <p className="text-gray-600 mt-4">
              Upload an audio recording or transcript to generate meeting notes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;*/