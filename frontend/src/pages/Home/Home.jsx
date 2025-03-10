import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'

Modal.setAppElement('#root');

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown : false,
    type : 'add',
    data : null,
  });
  
  return (
    <>
        <Navbar />
        <div className='container mx-auto'>
            <div className='grid grid-cols-3 gap-3 mt-8'>
                <NoteCard 
                    title = 'Meeting on 7th Apirl'
                    date = '9 March 2025'
                    content = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia cupiditate iure eveniet saepe omnis dignissimos sunt repellat, totam magni nostrum modi sequi necessitatibus delectus repudiandae in sint labore! Sed, qui.'
                    tags = '#Meeting'
                    isPinned={true}
                    onEdit={() => {}}
                    onDelete={() => {}}
                    onPinNote={() => {}}
                />
            </div>
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
                onClose={()=>{
                    setOpenAddEditModal({ isShown:false, type: "add", data: null });
                }}
            />
        </Modal>
    </>
  )
}

export default Home