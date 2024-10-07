import React, { useState, useEffect } from 'react';
import { useNavigate ,Redirect} from 'react-router-dom';

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faLock,
  faPhone,
  faPersonDress,
  faBuildingColumns,
  faPerson,
} from '@fortawesome/free-solid-svg-icons';

import './changeprofile.css'; 
import { useCookies } from 'react-cookie';
export default function Changeprofile() {
  const [file, setFile] = useState();
  const [cookies] = useCookies(['userId']);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contactNO: '',
    fatherName: '',
    motherName: '',
    education: '',
  });
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate(); 
  useEffect(() => {
    const fetchUserData = async () => {
      
      try {
        if (!cookies.userId) {
          console.error('User ID not found in cookies');
          return;
        }
        const response = await axios.get(`http://localhost:8000/user/fetchdetails?id=${cookies.userId}`);
        const userData = response.data;

        setFormData({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          contactNO: userData.contactNO,
          fatherName: userData.fatherName,
          motherName: userData.motherName,
          education: userData.education,
        });

        // If I have a profile picture URL in the response, I can update 'file' state as well
        // setFile(userData.profilePictureURL);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  
  const handleUpdate = async () => {
    console.log('Update button clicked');
    
    try {
      if (!cookies.userId) {
        console.error('User ID not found in cookies');
        return;
      }
      const response = await axios.put(`http://localhost:8000/user/updated?id=${cookies.userId}`, formData);
      console.log('Update Response:', response);
     
    
      setRedirect(true);
    // Navigate to the profiledata page
    // navigate('/profiledata');
      
    } catch (error) {
      console.error('Error updating user data:', error.message);
    }
  };
  

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  if (redirect) {
    navigate('/profiledata');
  }

  return (
    <>
      
        <div className='container'>
          <div className='header'>
            <div className='text'>Change Profile</div>
            <div className='underline'></div>
          </div>
          <div className='inputs'>
            <div className="App">
              <input type="file" onChange={handleChange} />
            </div>
            <div className='input'>
              <FontAwesomeIcon icon={faUser} />
              <input type='text' placeholder='Name' value={formData.name} onChange={(e) => handleInputChange(e, 'name')} required />
            </div>
            <div className='input'>
              <FontAwesomeIcon icon={faEnvelope} />
              <input type='email' placeholder='Email' value={formData.email} onChange={(e) => handleInputChange(e, 'email')} required />
            </div>
            <div className='input'>
              <FontAwesomeIcon icon={faLock} />
              <input type='password' placeholder='Password' value={formData.password} onChange={(e) => handleInputChange(e, 'password')} />
            </div>
            <div className='input'>
              <FontAwesomeIcon icon={faPhone} />
              <input type='number' placeholder='Contact No.' value={formData.contactNO} onChange={(e) => handleInputChange(e, 'contactNO')} required />
            </div>
            <div className='input'>
              <FontAwesomeIcon icon={faPerson} />
              <input type='text' placeholder='Father Name' value={formData.fatherName} onChange={(e) => handleInputChange(e, 'fatherName')} required />
            </div>
            <div className='input'>
              <FontAwesomeIcon icon={faPersonDress} />
              <input type='text' placeholder='Mother Name' value={formData.motherName} onChange={(e) => handleInputChange(e, 'motherName')} required />
            </div>
            <div className='input'>
              <FontAwesomeIcon icon={faBuildingColumns} />
              <input type='text' placeholder='Education' value={formData.education} onChange={(e) => handleInputChange(e, 'education')} required />
            </div>
          </div>

          <div className='submit-container'>
            <div className='sign-up ' onClick={handleUpdate}>Update</div>
          </div>
        </div>
      
    </>
  );
}
