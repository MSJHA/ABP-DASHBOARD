import React, { useState ,useEffect} from 'react';
import axios from '../plugin/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginSignup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';



export const LoginSignup = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const handleaction = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', { email, password }, { withCredentials: true });
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      toast.error('Login failed. Please try again.',{
      position:"top-right" ,
      theme:"colored",
      hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
    })
    } 
  };
  useEffect(() => {
    const checkSessions = async () => {
      try {
        const response = await axios.get('/Session_Controller',{ withCredentials: true });
        if (response.data.loggedIn) {
          // Redirect to dashboard if session exists
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error checking session:', error);
        // Handle errors if session check fails
      }
    };

    checkSessions();
  }, [navigate]);
  return (
    <>
      <div className='login-container container'>
        <div className='header'>
          <div className="Dashboard"></div>
          <div className="Dashboard"></div>
          <div className='text'>Login</div>
          <div className='underline'></div>
        </div>
        <div className='inputs'>
          <div className='input'>
            {/* <img src={email_icon} alt="" /> */}
            <FontAwesomeIcon icon={faEnvelope} alt="" />

            <input type="Email" placeholder='E-Mail/Username' onChange={(e) => setemail(e.target.value)} value={email} />
          </div>
        </div>
        <div className='inputs'>
          <div className='input'>
            {/* <img src={password_icon} alt="" /> */}
            <FontAwesomeIcon icon={faLock} alt="" />

            <input type="Password" placeholder='Password' onChange={(e) => setpassword(e.target.value)} value={password} />
          </div>
          <div className="submit">
            <div type="button" onClick={handleaction}>Submit </div>
          </div>
          <div className="signup">
            Not a User? <Link to="signup">Click here to SignUp</Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginSignup;
