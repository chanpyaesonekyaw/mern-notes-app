import React from 'react'
import { getInitials } from '../../utils/helper'
import { FiLogOut } from 'react-icons/fi'

const ProfileInfo = ({ userInfo, onLogOut, isLoggingOut }) => {
  if (!userInfo || !userInfo.fullName) {
    return null;
  }
  return (
    <div className='flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
            {getInitials(userInfo.fullName || 'U')}
        </div>
        <div>
            <p className='text-sm font-medium'>{userInfo.fullName}</p>
            <button 
              className='text-sm text-slate-700 hover:text-red-500 flex items-center gap-1 transition-colors duration-200' 
              onClick={onLogOut}
              disabled={isLoggingOut}
            >
              <FiLogOut size={14} />
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
        </div>
    </div>
  )
}

export default ProfileInfo