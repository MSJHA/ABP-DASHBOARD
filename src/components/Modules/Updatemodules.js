import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Box, Typography } from '@mui/material';
import '../Modules/Addmodules.css';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Updatemodules = () => {
  const [user, setUser] = useState(); 
  const [cookies] = useCookies(['userId']); 
  const [moduleName, setModuleName] = useState('');
  const [moduleFields, setModuleFields] = useState([{ id: 1, active: true, url: '' }]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userIdFromCookie = cookies.userId;
    if (!userIdFromCookie) {
      navigate('/');
    } else {
      setUser({ id: userIdFromCookie });
      const moduleId = location.state?.moduleId;
      if (moduleId) {
        fetchModuleDetails(moduleId);
      }
    }
  }, [cookies, navigate,location.state?.moduleId]);

  const fetchModuleDetails = async (moduleId) => {
    try {
      const response = await axios.get(`http://localhost:8000/getmodule/${moduleId}`);
      const { module } = response.data; 

      const { module_name, module_urls } = module;

      setModuleName(module_name);
      setModuleFields(module_urls.map((url, index) => ({ id: index + 1, active: true, url })));
    } catch (error) {
      console.error('Error fetching module details:', error);
      toast.error('Failed to fetch module details. Please try again later.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleUpdateModule = async (moduleId, moduleData) => {
    try {
      const response = await axios.put(`http://localhost:8000/edit/${moduleId}`, moduleData);
      const updatedModule = response.data; 

      console.log('Module updated successfully');

      return updatedModule;
    } catch (error) {
      alert('catch')
      console.error('Error updating module:', error);
      throw new Error('Failed to update module');
    }
  };

  const addModuleField = () => {
    const newId = moduleFields.length + 1;
    setModuleFields([...moduleFields, { id: newId, active: true, url: '' }]);
  };

  const removeModuleField = (index) => {
    const updatedFields = moduleFields.map((field, idx) => {
      if (idx === index) {
        return { ...field, active: false };
      }
      return field;
    });
    setModuleFields(updatedFields);
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    const updatedFields = moduleFields.map((field, idx) => {
      if (idx === index) {
        return { ...field, url: value };
      }
      return field;
    });
    setModuleFields(updatedFields);
  };

  return (
    <>
    <div className="form-container">
      <div className="sas">
        <Box sx={{ width: '80%', margin: 'auto', textAlign: 'left' }}>
          <Typography variant="h4" gutterBottom>
            Update Module
          </Typography>
          <form>
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
                      onChange={(e) => {
                        handleChange(e, index)
                        const value = e.target.value;
                        const isDuplicate = moduleFields.slice(0, index).some(item => item.url === value);
                        if (!isDuplicate) {
                          const updatedFields = [...moduleFields];
                          updatedFields[index].url = value;
                          setModuleFields(updatedFields);
                        }
                      }} 
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
  style={{ ...addButtonStyle2 }} 
  onClick={() => {
    handleUpdateModule(location.state.moduleId, { 
      module_name: moduleName, 
      module_urls: moduleFields.filter(field => field.active).map(field => field.url), 
      updated_by: user.id 
    });
    navigate('/modules');
  }}
> 
  Update
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
    backgroundColor:'red',
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
    backgroundColor:'green',
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
    backgroundColor:'midnightblue',
    borderRadius: '10px',
    width: '91px',
    height: '47px',
    fontSize: '21px',
    margin: '10px 200px'
  };

  export default Updatemodules;
