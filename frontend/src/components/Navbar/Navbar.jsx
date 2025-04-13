import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';
import axiosInstance from '../../utils/axioInstance';
import Toast from '../ToastMessage/Toast';
import { clearAuth } from '../../utils/tokenUtils';

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showToast, setShowToast] = useState({
    isShown: false,
    message: '',
    type: 'success'
  });

  const navigate = useNavigate();

  const onLogOut = async () => {
    // Show confirmation dialog
    if (!window.confirm('Are you sure you want to logout?')) {
      return;
    }
    
    setIsLoggingOut(true);
    
    try {
      // Call logout API
      await axiosInstance.post('/auth/logout');
      
      // Clear auth data
      clearAuth();
      
      // Show success message
      setShowToast({
        isShown: true,
        message: 'Logged out successfully',
        type: 'success'
      });
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      console.error('Logout error:', error);
      setShowToast({
        isShown: true,
        message: 'Error during logout. Please try again.',
        type: 'error'
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery('');
    handleClearSearch();
  };

  const handleCloseToast = () => {
    setShowToast({
      isShown: false,
      message: '',
      type: 'success'
    });
  };

  return (
    <>
      <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
          <h2 className='text-xl font-medium text-black py-2'>My Notes</h2>
          <SearchBar 
            value={searchQuery}
            onChange={({target})=>{
              setSearchQuery(target.value);
            }}
            handleSearch = {handleSearch}
            onClearSearch = {onClearSearch}
          />
          <ProfileInfo 
            userInfo={userInfo} 
            onLogOut={onLogOut} 
            isLoggingOut={isLoggingOut}
          />
      </div>
      
      {showToast.isShown && (
        <Toast 
          message={showToast.message} 
          type={showToast.type} 
          onClose={handleCloseToast} 
        />
      )}
    </>
  )
}

export default Navbar