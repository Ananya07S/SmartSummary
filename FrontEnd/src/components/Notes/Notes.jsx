import React, { useState, useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Icon from 'components/Icon';

const Notes = () => {
  const history = useHistory();
  const { id } = useParams();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [noteData, setNoteData] = useState({});
  const [mom, setMom] = useState('');
  const [msg, setMsg] = useState('');

  const changeEditing = () => {
    setEditing((state) => !state);
  };

  const viewFullText = () => {
    const newWindow = window.open('/fullContent');
    newWindow.data = noteData.content;
    newWindow.meetingHead = noteData.title;
  };

  const deleteNoteWithId = async () => {
    if (window.confirm('This action will delete the notes from your account!')) {
      try {
        const response = await fetch("http://localhost:5050/notes/delete", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: noteData._id })
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete note');
        }
        
        history.push('/');
      } catch (error) {
        console.error("Error deleting note:", error);
        setMsg('Failed to delete note');
        setTimeout(() => setMsg(''), 3000);
      }
    }
  };

  const saveNotes = async () => {
    setSaving(true);
    try {
      const response = await fetch("http://localhost:5050/notes/update", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          id: noteData._id,
          title: noteData.title,
          markdown: mom 
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update note');
      }
      
      const updatedNote = await response.json();
      setNoteData(updatedNote);
      setEditing(false);
      setMsg('Notes saved successfully!');
      setTimeout(() => setMsg(''), 3000);
    } catch (error) {
      console.error("Error saving note:", error);
      setMsg('Failed to save notes');
      setTimeout(() => setMsg(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const getNoteData = useCallback(async () => {
    try {
      setLoading(true);
      
      const response = await fetch(`http://localhost:5050/notes/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch note');
      }
      
      const data = await response.json();
      console.log("Fetched note data:", data);
      
      // Initialize markdown content - prioritize markdown, then summary
      const markdownContent = data.markdown || data.summary || '';
      
      setNoteData({
        ...data,
        score: data.score || 85, // Default score if not present
        //duration: data.duration || "N/A"
      });
      setMom(markdownContent);
    } catch (error) {
      console.error("Error fetching note:", error);
      setMsg('Failed to load note');
      setTimeout(() => setMsg(''), 3000);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getNoteData();
  }, [getNoteData]);

  if (loading) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className='w-full p-6'>
      <h1 className='my-2 text-center text-4xl text-gray-700 font-bold'>
        {noteData.title || "Untitled Meeting"}
      </h1>
      <div className='flex flex-wrap lg:flex-nowrap mx-6 mt-16'>
        <div className='w-full md:w-2/3'>
          <div className='flex items-center flex-wrap justify-center md:justify-between'>
            <h1 className='text-center my-4 text-3xl font-bold'>
              Meeting Notes
            </h1>
            <div className='flex flex-wrap'>
              <button
                className='focus:outline-none text-white bg-yellow-500 py-1 text-sm font-bold rounded-full px-4 my-2 mx-1'
                onClick={viewFullText}
              >
                View Full Text
              </button>
              <button
                onClick={changeEditing}
                className='focus:outline-none text-white bg-blue-500 py-1 text-sm font-bold rounded-full px-4 my-2 mx-2'
              >
                {editing ? 'Disable Edit' : 'Edit'}
              </button>
              <button
                onClick={deleteNoteWithId}
                className='focus:outline-none text-white bg-red-500 py-1 text-sm font-bold rounded-full px-4 my-2 mx-1'
              >
                Delete
              </button>
              <button
                disabled={!editing || saving}
                onClick={saveNotes}
                className={`focus:outline-none text-white py-1 text-sm font-bold rounded-full px-4 my-2 mx-2 ${
                  !editing || saving ? 'bg-gray-400' : 'bg-green-600'
                }`}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
          <textarea
            style={
              editing
                ? { height: 700, fontFamily: 'monospace' }
                : { height: 700, fontFamily: 'monospace', opacity: 0.92 }
            }
            className='text-xl w-full bg-gray-800 text-white leading-7 focus:outline-none resize-y p-6 rounded'
            value={mom}
            readOnly={!editing}
            onChange={(e) => setMom(e.target.value)}
          ></textarea>
        </div>
        <div className='text-2xl p-4 lg:p-10 flex flex-wrap justify-center lg:justify-start lg:flex-col text-gray-600 font-bold lg:mx-4'>
          <p className='flex items-center m-4'>
            <Icon name='date' /> &nbsp;&nbsp;
            <span>
              {new Date(noteData.createdAt || Date.now()).toLocaleDateString()}
            </span>
          </p>
          
          <p className='flex items-center m-4'>
            <Icon name='score' /> &nbsp;&nbsp;
            <span>{noteData.score}/100</span>
          </p>
          <p
            style={{ width: 240 }}
            className={`mt-4 text-md font-normal ${
              msg.includes('Failed') ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {msg}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notes;
/*import React, { useState, useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Icon from 'components/Icon';

const Notes = ({ user }) => {
  const history = useHistory();
  const { id } = useParams();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [noteData, setNoteData] = useState({});
  const [mom, setMom] = useState('');
  const [msg, setMsg] = useState('');

  const changeEditing = () => {
    setEditing((state) => !state);
  };

  const viewFullText = () => {
    const newWindow = window.open('/fullContent');
    newWindow.data = noteData.content;
    newWindow.meetingHead = noteData.title;
  };

  const deleteNoteWithId = async () => {
    if (window.confirm('This action will delete the notes from your account!')) {
      try {
        const token = localStorage.getItem('token');
        
        const response = await fetch("http://localhost:5050/notes/delete", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ id: noteData._id })
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete note');
        }
        
        history.push('/');
      } catch (error) {
        console.error("Error deleting note:", error);
        setMsg('Failed to delete note');
        setTimeout(() => setMsg(''), 3000);
      }
    }
  };

  const saveNotes = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch("http://localhost:5050/notes/update", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          id: noteData._id,
          title: noteData.title,
          markdown: mom 
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update note');
      }
      
      const updatedNote = await response.json();
      setNoteData(updatedNote);
      setEditing(false);
      setMsg('Notes saved successfully!');
      setTimeout(() => setMsg(''), 3000);
    } catch (error) {
      console.error("Error saving note:", error);
      setMsg('Failed to save notes');
      setTimeout(() => setMsg(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const getNoteData = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5050/notes/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch note');
      }
      
      const data = await response.json();
      
      // Initialize markdown content with summary if markdown is empty
      const markdownContent = data.markdown || data.summary || '';
      
      setNoteData({
        ...data,
        score: data.score || 85, // Default score if not present
        duration: data.duration || "N/A"
      });
      setMom(markdownContent);
    } catch (error) {
      console.error("Error fetching note:", error);
      setMsg('Failed to load note');
      setTimeout(() => setMsg(''), 3000);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (user && user.email) {
      getNoteData();
    }
  }, [getNoteData, user]);

  if (loading) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className='w-full p-6'>
      <h1 className='my-2 text-center text-4xl text-gray-700 font-bold'>
        {noteData.title}
      </h1>
      <div className='flex flex-wrap lg:flex-nowrap mx-6 mt-16'>
        <div className='w-full md:w-2/3'>
          <div className='flex items-center flex-wrap justify-center md:justify-between'>
            <h1 className='text-center my-4 text-3xl font-bold'>
              Meeting Notes
            </h1>
            <div className='flex flex-wrap'>
              <button
                className='focus:outline-none text-white bg-yellow-500 py-1 text-sm font-bold rounded-full px-4 my-2 mx-1'
                onClick={viewFullText}
              >
                View Full Text
              </button>
              <button
                onClick={changeEditing}
                className='focus:outline-none text-white bg-blue-500 py-1 text-sm font-bold rounded-full px-4 my-2 mx-2'
              >
                {editing ? 'Disable Edit' : 'Edit'}
              </button>
              <button
                onClick={deleteNoteWithId}
                className='focus:outline-none text-white bg-red-500 py-1 text-sm font-bold rounded-full px-4 my-2 mx-1'
              >
                Delete
              </button>
              <button
                disabled={!editing || saving}
                onClick={saveNotes}
                className={`focus:outline-none text-white py-1 text-sm font-bold rounded-full px-4 my-2 mx-2 ${
                  !editing || saving ? 'bg-gray-400' : 'bg-green-600'
                }`}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
          <textarea
            style={
              editing
                ? { height: 700, fontFamily: 'monospace' }
                : { height: 700, fontFamily: 'monospace', opacity: 0.92 }
            }
            className='text-xl w-full bg-gray-800 text-white leading-7 focus:outline-none resize-y p-6 rounded'
            value={mom}
            readOnly={!editing}
            onChange={(e) => setMom(e.target.value)}
          ></textarea>
        </div>
        <div className='text-2xl p-4 lg:p-10 flex flex-wrap justify-center lg:justify-start lg:flex-col text-gray-600 font-bold lg:mx-4'>
          <p className='flex items-center m-4'>
            <Icon name='date' /> &nbsp;&nbsp;
            <span>
              {new Date(noteData.created_at || noteData.createdAt).toLocaleDateString()}
            </span>
          </p>
          <p className='flex items-center m-4'>
            <Icon name='time' /> &nbsp;&nbsp;&nbsp;
            <span>{noteData.duration}</span>
          </p>
          <p className='flex items-center m-4'>
            <Icon name='score' /> &nbsp;&nbsp;
            <span>{noteData.score}/100</span>
          </p>
          <p
            style={{ width: 240 }}
            className={`mt-4 text-md font-normal ${
              msg.includes('Failed') ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {msg}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notes;*/