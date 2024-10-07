import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import './profiledata.css';
import BackgroundImage from '../../newcomponents/assets/PngItem_293480.png';
import { useCookies } from 'react-cookie';

const Profiledata = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [cookies] = useCookies(['userId']);

  const handleEditClick = () => {
    navigate('/changing');
  };

  const UserProfileCard = ({ user }) => {
    const divStyle = {
      backgroundImage: `url(${BackgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    };

    return (
        <div className="outer-container" style={divStyle}>
          <div className="partition">
            <div className="nameone">
              <h2>{user.name}</h2>
            </div>
            <div className="table-responsive">
              <table className="table-property">
                <tbody>
                  <tr>
                    <td>
                      <p> {user.contactNO}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p> {user.email}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>CreatedAt: {user.createdAt}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>FatherName: {user.fatherName}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>MotherName: {user.motherName}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className='editing'>
                <FontAwesomeIcon icon={faEdit} onClick={handleEditClick}/>
              </div>
            </div>
          </div>
        </div>
    );
  };

  const fetchUserData = async () => {
    try {
      if (!cookies.userId) {
        console.error('User ID not found in cookies');
        return;
      }
      const response = await axios.get(`http://localhost:8000/datauser?id=${cookies.userId}`);
      console.log('Response:', response);

      const data = response.data;
      console.log('Data:', data);

      setUserData(data);
      navigate('/profiledata');
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    console.log('Fetching user data...');
    fetchUserData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="app">
      {userData ? <UserProfileCard user={userData} /> : <p>Loading...</p>}
    </div>
  );
};

export default Profiledata;
