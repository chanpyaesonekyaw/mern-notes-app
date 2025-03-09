import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const PasswordInput = ({value, onChange, placeholder}) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const toggleShowPassword = ()=> {
        setIsShowPassword(!isShowPassword);
    }

    return (
    <div className='flex item-center bg-transparent border border-[1.5px] rounded mb-4 px-5 py-3'>
        <input 
            value={value}
            onChange={onChange}
            type={isShowPassword ? 'text' : 'password'}
            placeholder={placeholder || 'Password'}
            className='w-full text-sm bg-transparent mr-3 outline-none'
        />
        {isShowPassword ? <FaRegEye 
            size={22}
            className='text-primary cursor-pointer'
            onClick={()=> toggleShowPassword()}
        /> : <FaRegEyeSlash 
            size={22}
            className='text-slate-400 cursor-pointer'
            onClick={()=> toggleShowPassword()}
        />}
    </div>
    )
}

export default PasswordInput