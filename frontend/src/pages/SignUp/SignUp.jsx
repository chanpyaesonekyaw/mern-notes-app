import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/Input/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axioInstance';
import { setToken, setUser, isAuthenticated } from '../../utils/tokenUtils';
import Toast from '../../components/ToastMessage/Toast';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState({
    isShown: false,
    message: '',
    type: 'error'
  });

  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError('Please enter your name.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Please enter a password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setIsLoading(true);

    // Sign-Up API Call
    try {
      const response = await axiosInstance.post('/auth/register', {
        fullName: name,
        email: email,
        password: password,
      });

      if (response.data && response.data.error) {
        setError(response.data.message);
        setShowToast({
          isShown: true,
          message: response.data.message,
          type: 'error'
        });
        return;
      }

      if (response.data && response.data.accessToken) {
        // Save token and user data
        setToken(response.data.accessToken);
        
        // If user data is returned, save it
        if (response.data.user) {
          setUser(response.data.user);
        }
        
        // Show success message
        setShowToast({
          isShown: true,
          message: 'Registration successful!',
          type: 'success'
        });
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
        setShowToast({
          isShown: true,
          message: error.response.data.message,
          type: 'error'
        });
      } else {
        setError('An unexpected error occurred. Please try again.');
        setShowToast({
          isShown: true,
          message: 'An unexpected error occurred. Please try again.',
          type: 'error'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseToast = () => {
    setShowToast({
      isShown: false,
      message: '',
      type: 'error'
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">Sign Up</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />

            <PasswordInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
            />

            {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

            <button
              type="submit"
              className="btn-primary cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>

            <p className="text-sm text-center mt-3">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
      
      {showToast.isShown && (
        <Toast 
          message={showToast.message} 
          type={showToast.type} 
          onClose={handleCloseToast} 
        />
      )}
    </>
  );
};

export default SignUp;
