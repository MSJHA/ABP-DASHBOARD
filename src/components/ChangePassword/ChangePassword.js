import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { TextField, Button, Box, Typography } from '@mui/material';
import logoutAPI from '../../utils/logoutAPI';
import './ChangePassword.css';

import axios from 'axios';

const ChangePassword = () => {
  const navigate = useNavigate(); // Utilize the useNavigate hook
  const [oldPassword, setOldPassword] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else if (name === 'oldPassword') {
      setOldPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8000/ChangePassword', {
        email,
        oldPassword,
        newPassword,
        confirmPassword,
      });
      
      // If password change is successful, proceed with logout
      if (response.data.response === "SUCCESS") {
        // Call the logout API
        await logoutAPI();
        
        // Clear state and navigate to login page
        setEmail('');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setErrorMessage('');
        navigate('/');
      } else {
        // If password change fails, set error message
        setErrorMessage('Failed to change password. Please try again.');
      }
    } catch (error) {
      console.error('Error while changing password:', error.message);
      setErrorMessage('Failed to change password. Please try again.');
    }
  };
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="form-container">
    <div className="sas">
      <Box sx={{ width: '80%', margin: 'auto', textAlign: 'left' }}>
        <Typography variant="h4" gutterBottom>
          Change Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ width: '100%', marginBottom: 2 }}>
            <Typography variant="body1">Email</Typography>
            <TextField
              type="text"
              id="email"
              name="email"
              variant="outlined"
              value={email}
              onChange={handleChange}
              required
            />
          </Box>
          <Box sx={{ width: '100%', marginBottom: 2 }}>
            <Typography variant="body1">Old Password</Typography>
             <TextField
              type="text"
              id="oldPassword"
              name="oldPassword"
              variant="outlined"
              value={oldPassword}
              onChange={handleChange}
              required
            />
          </Box>
          <Box sx={{ width: '100%', marginBottom: 2 }}>
            <Typography variant="body1">New Password</Typography>
            <TextField
              type="password"
              id="newPassword"
              name="newPassword"
              variant="outlined"
              value={newPassword}
              onChange={handleChange}
              required
            />
          </Box>
          <Box sx={{ width: '100%', marginBottom: 2 }}>
            <Typography variant="body1">Confirm Password</Typography>
            <TextField
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              variant="outlined"
              value={confirmPassword}
              onChange={handleChange}
              required
            />
          </Box>
          {errorMessage && (
            <Typography variant="body2" color="error" gutterBottom>
              {errorMessage}
            </Typography>
          )}
          <Button variant="contained" type="submit">
            Edit
          </Button>
        </form>
      </Box>
    </div>
    </div>
  );
};

export default ChangePassword;