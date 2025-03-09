import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/Input/PasswordInput'
import { Link } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'

const login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        if(!validateEmail(email)){
            setError('Please enter a valid email address.');
            return;
        }

        if(!password){
            setError('Please enter the password.');
            return;
        }
        setError('');

        // Login Api Call 
    }

    return (
        <>
            <Navbar />
            <div className='flex item-center justify-center mt-28'>
                <div className='w-96 border rounded bg-white px-7 py-10'>
                    <form onSubmit={handleLogin}>
                        <h4 className='text-2xl mb-7'>Login</h4>
                        
                        <input 
                            type='text' 
                            placeholder='Email' 
                            className='input-box' 
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                        />
                        <PasswordInput 
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                        />
                        {error && <p className='text-red-500 text-sm pb-1'>{error}</p>}
                        <button type='submit' className='btn-primary cursor-pointer'>Login</button>

                        <p className='text-sm text-center mt-3'>
                            Not register yet?{' '}
                            <Link to='/signup' className='font-medium text-primary underline'>
                                Create an Account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default login