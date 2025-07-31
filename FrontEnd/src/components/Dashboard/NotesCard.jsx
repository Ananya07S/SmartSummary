import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/Icon';

const NotesCard = ({ data, deleteNoteWithId }) => {
  const deleteNotes = (e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Prevent event bubbling
    deleteNoteWithId(data.id);
  };

  // Format date safely
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid date";
    }
  };

  return (
    <div
      className='relative bg-white rounded-md shadow-md hover:shadow-lg m-6 pt-4'
      style={{ width: 300 }}
    >
      <Link to={`/notes/${data.id}`} title={data.title}>
        <div className='p-2 flex justify-center relative'>
          <Icon name='notes' />
          
        </div>
        <div className='rounded-b-md bg-gray-800 text-white p-2 flex justify-between items-center mt-2'>
          <p className='font-medium capitalize'>{data.title || "Untitled"}</p>
          <p className='text-xs'>
            {formatDate(data.created_at)}
          </p>
        </div>
      </Link>
      <span
        title='Delete Notes'
        className='cursor-pointer absolute top-3 right-2'
        onClick={deleteNotes}
      >
        <Icon name='delete' />
      </span>
    </div>
  );
};

export default NotesCard;