import React from 'react'

const AddEditNotes = () => {
  return (
    <div>
        <div className='flex flex-col gap-2'>
            <label className='input-label uppercase'>Title</label>
            <input 
                type="text" 
                className='text-2xl text-slate-950 outline-none p-2'
                placeholder='Enter your title'
            />
        </div>
        <div className='flex flex-col gap-2 mt-4'>
            <label className='input-label uppercase'>Content</label>
            <textarea
                className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
                placeholder='Content'
                rows={10}
            />
        </div>
        <div className='mt-3 flex flex-col gap-2'>
            <label className='input-label uppercase'>Tags</label>
        </div>
        <button className='btn-primary font-medium mt-5 p-3' onClick={() => {}} >
            ADD
        </button>
    </div>
  )
}

export default AddEditNotes