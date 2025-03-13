import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({value, onChange, handleSearch, onClearSearch}) => {
    
    return (
        <div className='w-[30%] flex items-center bg-slate-100 rounded-md px-4'>
            <input
                type="text"
                placeholder="Search Notes"
                className="w-full text-sm bg-transparent py-[11px] mr-3 outline-none"
                value={value}
                onChange={onChange}
            />
            {value && <IoMdClose 
                className='text-slate-400 hover:text-black cursor-pointer text-xl mr-3'
                onClick={onClearSearch}
            />}
            <FaMagnifyingGlass 
                className='text-slate-400 hover:text-black cursor-pointer'
                onClick={handleSearch}
            />
        </div>
    )
}

export default SearchBar