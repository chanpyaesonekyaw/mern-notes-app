import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axioInstance'
import Toast from '../../components/ToastMessage/Toast'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import AddNoteImg from '../../assets/images/add-notes.svg'
import HealthCheck from '../../components/HealthCheck'

Modal.setAppElement('#root');

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown : false,
    type : 'add',
    data : null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: '',
    type: 'add',
  });
  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: 'edit' });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
        isShown: true,
        message: message,
        type: type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
        isShown: false,
        message: '',
    });
  };

  //   Get User Info
  const getUserInfo = async () => {
    try{
        const response = await axiosInstance.get('/auth/get-user');
        if (response.data && response.data.user){
            setUserInfo(response.data.user);
        }
    }catch(error){
        if(error.response.status == 401){
            localStorage.clear();
            navigate('/login');
        }
    }
  };

  //   Get all notes
  const getAllNotes = async () => {
    try{
        const response = await axiosInstance.get('/notes/get-all-notes');

        if(response.data && response.data.notes){
            setAllNotes(response.data.notes);
        }
    } catch (error){
        console.log('An unexpected error occured. Please try again.');
    }
  };

  //   Delete note
  const deleteNote = async (data) => {
      const noteId = data._id;
       try{
        const response = await axiosInstance.delete('/notes/delete-note/' + noteId);
  
        if(response.data && !response.data.error){
          showToastMessage('Note Deleted Successfully', 'delete');
          getAllNotes();
        }
      }catch(error){
          if(error.response && error.response.data && error.response.data.message){
            console.log('An unexpected error occurred. Please try again.');
          }
      }
  };

  //   Search for a note 
  const onSearchNote = async (query) => {
    try{
        const response = await axiosInstance.get('/notes/search-notes', {
            params: {query},
        });
        if (response.data && response.data.notes){
            setIsSearch(true);
            setAllNotes(response.data.notes);
        }
    } catch(error) {
        console.log(error);
    }
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
     try{
      const response = await axiosInstance.put('/notes/update-note-pinned/' + noteId, {
        isPinned: !noteData.isPinned,
      });

      if(response.data && response.data.note){
        showToastMessage('Note Updated Successfully');
        getAllNotes();
      }
    }catch(error){
        console.log('An unexpected error occurred. Please try again.');
    }
  }

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);
  
  return (
    <>
        <Navbar userInfo={ userInfo } onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />

        {/* Add HealthCheck component for debugging */}
        {process.env.NODE_ENV === 'development' && (
            <div className="max-w-md mx-auto mt-4">
                <HealthCheck />
            </div>
        )}

        <div className='container mx-auto'>
            {allNotes.length > 0 ? (
                <div className='grid grid-cols-3 gap-3 mt-8'>
                    {allNotes.map((item, index)=>(
                        <NoteCard 
                            key={item._id}
                            title = {item.title}
                            date = {item.createdOn}
                            content = {item.content}
                            tags = {item.tags}
                            isPinned={item.isPinned}
                            onEdit={() => handleEdit(item)}
                            onDelete={() => deleteNote(item)}
                            onPinNote={() => updateIsPinned(item)}
                        />
                    ))}
                </div>
            ) : (
                <EmptyCard 
                    imgSrc={AddNoteImg} 
                    message={isSearch ? `Oops! No notes found matching your search.` : `Start creating your first note! Click the 'Add' button to hot down your 
                    thoughts, ideas, and reminders. Let's get started!`} />
            )}
        </div>

        <button 
            className='w-16 h-16 flex items-center justify-center bg-primary hover:bg-blue-600 cursor-pointer rounded-2xl absolute right-10 bottom-10'
            onClick={() => {
                setOpenAddEditModal({ isShown: true, type: 'add', data: null });
            }}
        >
            <MdAdd className='text-[32px] text-white' />
        </button>

        <Modal
            isOpen = {openAddEditModal.isShown}
            onRequestClose = {() => {}}
            style = {{
                overlay: {
                    backgroundColor : 'rgb(0 0 0 / 20%)',
                },
            }}
            contentLabel = ''
            className = 'w-[50%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll'
        >
            <AddEditNotes 
                type={openAddEditModal.type}
                noteData={openAddEditModal.data}
                onClose={()=>{
                    setOpenAddEditModal({ isShown:false, type: "add", data: null });
                }}
                getAllNotes={getAllNotes}
                showToastMessage={showToastMessage}
            />
        </Modal>

        <Toast 
            isShown={showToastMsg.isShown}
            message={showToastMsg.message}
            type={showToastMsg.type}
            onClose={handleCloseToast}
        />
    </>
  )
}

export default Home