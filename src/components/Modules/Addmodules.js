import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Addmodules = () => {
  const [user, setUser] = useState();
  const [cookies] = useCookies(['userId']);
  const [moduleName, setModuleName] = useState('');
  const [moduleFields, setModuleFields] = useState([{ id: 1, active: true }]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userIdFromCookie = cookies.userId;
    if (!userIdFromCookie) {
      navigate('/login');
    } else {
      setUser({ id: userIdFromCookie });
      const moduleId = location.state?.moduleId;
      if (moduleId) {
      }
    }
  }, [cookies, navigate, location.state?.moduleId]);

  const handleAddModule = async (e) => {
    e.preventDefault();
    try {
      const moduleData = {
        module_name: moduleName,
        module_urls: moduleFields.filter(field => field.active && field.url !== '').map(field => field.url),
        created_by: user.id
      };

      const response = await axios.post('http://localhost:8000/addmodule', moduleData);
      console.log('Module added successfully:', response.data);
      navigate('/modules', { state: { moduleAdded: true } });
    } catch (error) {
      console.error('Error adding new module:', error);
      if (error.response && error.response.status === 409) {
        toast.error('Module with the same name or url already exists!', {
          position: "top-right",
          autoClose: 1000,
          theme: 'colored',
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error('Failed to add module. Please try again later.', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  const addModuleField = () => {
    const newId = moduleFields.length + 1;
    setModuleFields([...moduleFields, { id: newId, active: true, url: '' }]);
  };

  const removeModuleField = (index) => {
    const updatedFields = [...moduleFields];
    updatedFields[index].active = false;
    setModuleFields(updatedFields);
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    const updatedFields = [...moduleFields];
    updatedFields[index].url = value;
    setModuleFields(updatedFields);
  };

  return (
    <>
      <div className="form-container">
        <div className="sas">
          <Box sx={{ width: '80%', margin: 'auto', textAlign: 'left' }}>
          <Typography variant="h4" gutterBottom>
              Add Module
            </Typography>
            <form onSubmit={handleAddModule}>
              <Box sx={{ width: '100%', marginBottom: 2, marginTop: 2 }}>
                <Typography variant="body1">Module Name </Typography>
                <TextField
                  type="text"
                  variant="outlined"
                  required
                  value={moduleName}
                  onChange={(e) => setModuleName(e.target.value)}
                />
              </Box>
              {moduleFields.map((field, index) => (
                field.active && (
                  <Box key={field.id} sx={{ width: '100%', marginBottom: 2 }}>
                    <Typography variant="body1">Module URL {index + 1}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        type="text"
                        variant="outlined"
                        required
                        value={field.url}
                        onChange={(e) => handleChange(e, index)}
                      />
                      {index > 0 && (
                        <button
                          style={{ ...addButtonStyle }}
                          onClick={() => removeModuleField(index)}
                        >
                          - Delete
                        </button>
                      )}
                    </Box>
                  </Box>
                )
              ))}
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <button
                  onClick={addModuleField}
                  style={{ ...addButtonStyle1 }}
                >
                  + Add more
                </button>
                <button
                  style={{ ...addButtonStyle2 }} onClick={handleAddModule}
                >
                  Submit
                </button>
              </Box>
            </form>
          </Box>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

const addButtonStyle = {
  padding: '10px 12px',
  border: 'none',
  cursor: 'pointer',
  color: 'white',
  backgroundColor: 'red',
  borderRadius: '10px',
  width: '100px',
  height: '50px',
  fontSize: '17px',
  marginLeft: '10px'
};
const addButtonStyle1 = {
  padding: '10px 12px',
  border: 'none',
  cursor: 'pointer',
  color: 'white',
  backgroundColor: 'green',
  borderRadius: '10px',
  width: '107px',
  height: '50px',
  fontSize: '16px'
};
const addButtonStyle2 = {
  padding: '10px 12px',
  border: 'none',
  cursor: 'pointer',
  color: 'white',
  backgroundColor: 'midnightblue',
  borderRadius: '10px',
  width: '91px',
  height: '47px',
  fontSize: '21px',
  margin: '10px 200px'
};

export default Addmodules;
