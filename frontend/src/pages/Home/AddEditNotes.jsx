import React, { useState, useEffect } from 'react';
import TagInput from '../../components/Input/TagInput';
import { MdClose } from 'react-icons/md';

const AddEditNotes = ({ nodeData, type, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]); // Tags should be an array
  const [error, setError] = useState(null);

  const addNewNote = async () => {};

  const editNode = async () => {};

  useEffect(() => {
    if (nodeData) {
      setTitle(nodeData.title || '');
      setContent(nodeData.content || '');
      setTags(nodeData.tags || []);
    }
  }, [nodeData]);

  const handleAddNode = () => {
    if (!title.trim()) {
      setError('Please enter the title.');
      return;
    }

    if (!content.trim()) {
      setError('Please enter the content.');
      return;
    }

    setError('');
    
    // Handle save logic here...
    console.log({ title, content, tags, type });

    if(type === 'edit'){
        editNode();
    }else{
        addNewNote();
    }

    // Close the modal after adding the note
    onClose();
  };

  return (
    <div className="relative">
      <button 
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 cursor-pointer hover:bg-slate-100" 
        onClick={onClose} 
      >
        <MdClose className="text-xl text-slate-400" />
      </button>
      
      <div className="flex flex-col gap-2">
        <label className="input-label uppercase">Title</label>
        <input 
          type="text" 
          className="text-xl text-slate-950 outline-none border p-2 rounded"
          placeholder="Enter your title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label uppercase">Content</label>
        <textarea
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded border"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)} 
        />
      </div>
      
      <div className="mt-3 flex flex-col gap-2">
        <label className="input-label uppercase">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button 
        className="btn-primary font-medium mt-5 p-3 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleAddNode} 
      >
        {type === 'edit' ? 'Update' : 'Add'}
      </button>
    </div>
  );
};

export default AddEditNotes;
