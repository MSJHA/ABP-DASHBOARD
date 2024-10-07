import React, { useState } from 'react';
import './Signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faPhone } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../plugin/axios"; 
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNO, setContactNO] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post('/signup', {
        name,
        email,
        password,
        contactNO,
      });

      console.log(response.data);
      toast.success('Signup successful!', {
        position:"top-right",
        autoClose: 1000, 
        theme:"colored",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: () => navigate('/')
      });
    } catch (error) {
      console.error('Signup failed:', error.response ? error.response.data : error.message);
      toast.error('Signup failed. Please try again.',{
        position:"top-right" ,
        theme:"colored",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className='signup-container container'>
      <div className='header'>
        <div className='text'>Sign Up</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <FontAwesomeIcon icon={faUser} />
          <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className='input'>
          <FontAwesomeIcon icon={faEnvelope} />
          <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className='input'>
          <FontAwesomeIcon icon={faLock} />
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div className='input'>
          <FontAwesomeIcon icon={faPhone} />
          <input type='text' placeholder='Contact No' value={contactNO} onChange={(e) => setContactNO(e.target.value)} required />
        </div>
      </div>

      <div className='submit-container'>
        <div className='sign-up ' onClick={handleSignup}>
          Submit
        </div>
      </div>
      <ToastContainer />
    </div>
    
  );
};

export default Signup;
