import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Box, Typography, MenuItem, Select } from '@mui/material';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const SetModules = () => {
  const [user, setUser] = useState();
  const [roleId, setRoleId] = useState('');
  const [cookies] = useCookies(['userId']);
  const [moduleNames, setModuleNames] = useState(['']);
  const [fetchedModules, setFetchedModules] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchModules = async () => {
    try {
      const response = await fetch('http://localhost:8000/system/module/list');
      if (!response.ok) {
        throw new Error('Failed to fetch modules');
      }
      const data = await response.json();
      console.log('Fetched Modules:', data);
      setFetchedModules(data);
    } catch (error) {
      console.error('Error fetching modules:', error);
      toast.error('An error occurred while fetching modules.');
    }
  };
  const fetchModulesForRoleId = async (roleId) => {
    try {
      const response = await axios.get(`http://localhost:8000/role-modules/${roleId}`);
      const { modules } = response.data;

      if (modules.length === 0) {
        // If the role does not have any modules, fetch all available modules
        fetchModules();
        setModuleNames(['']);
      } else {
        const moduleNames = modules.map(module => module.name);
        setModuleNames(moduleNames);
      }
    } catch (error) {
      console.error('Error fetching modules for role ID:', error);
      toast.error('Failed to fetch modules');
    }
  };

  useEffect(() => {
    const roleIdFromState = location.state?.roleId;
    if (roleIdFromState) {
      setRoleId(roleIdFromState);
      fetchModulesForRoleId(roleIdFromState);
    } else {
      fetchModules();
    }
  }, [location.state?.roleId]);
  useEffect(() => {
    const userIdFromCookie = cookies.userId;
    if (userIdFromCookie) {
      setUser({ id: userIdFromCookie });
    } else {
      navigate('/');
    }
  }, [cookies, navigate]);
  
  useEffect(() => {
    const moduleId = location.state?.moduleId;
    if (!moduleId) {
      fetchModules(); 
    } else {
      fetchModulesForRoleId(moduleId);
    }
  }, [location.state?.moduleId]);

  const handleModuleNameChange = (e, index) => {
    const { value } = e.target;
    const updatedModuleNames = [...moduleNames];
    updatedModuleNames[index] = value;
    setModuleNames(updatedModuleNames);
  };

  const addModuleNameField = () => {
    setModuleNames([...moduleNames, '']);
  };

  const removeModuleNameField = (indexToRemove) => {
    const updatedModuleNames = moduleNames.filter((name, index) => index !== indexToRemove);
    setModuleNames(updatedModuleNames);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nonEmptyModuleNames = moduleNames.filter(name => name.trim() !== '');
      const moduleIds = nonEmptyModuleNames.map(name => fetchedModules.find(module => module.module_name === name).id);
      const response = await axios.post('http://localhost:8000/mulroleid', {
        role_id: roleId, 
        modules: moduleIds
      });

      

      if (response.status !== 201) { 
        toast.error('Failed to add modules: Duplicate entries may exist');
      } else {
        console.log('Role Module(s) Created:', response.data);
        toast.success('Modules added successfully');
      }
      navigate('/assignrole');
    } catch (error) {
      console.error('Error creating role module(s):', error);
      toast.error('Failed to add modules');
    }
  };

  const getFilteredModules = (index) => {
    const selectedModules = moduleNames.slice(0, index);
    return fetchedModules.filter(module => !selectedModules.includes(module.module_name) && module.module_name !== '');
  };
  

  return (
    <>
      <div className="form-container">
        <div className="sas">
          <Box sx={{ width: '80%', margin: 'auto', textAlign: 'left' }}>
            <Typography variant="h4" gutterBottom>
              Select Module
            </Typography>

            <form onSubmit={handleSubmit}>
              {moduleNames.map((name, index) => (
                <Box key={index} sx={{ width: '100%', marginBottom: 2 }}>
                  <Typography variant="body1">Module Name {index === 0 ? '' : index + 1}</Typography>
                  <Box sx={{ position: 'relative' }}>
                    <Select
                      labelId="module-select-label"
                      value={name}
                      onChange={(e) => handleModuleNameChange(e, index)}
                      variant="outlined"
                      required
                      sx={{ minWidth: 400 }}
                    >
                     {getFilteredModules(index).map((module) => (
                        <MenuItem key={module.id} value={module.module_name}>
                          {module.module_name}
                        </MenuItem>
                     ))}
                    </Select>
                    <button
                      type="button"
                      style={{
                        padding: '10px 12px',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'white',
                        backgroundColor: 'red',
                        borderRadius: '10px',
                        width: '91px',
                        height: '50px',
                        fontSize: '18px',
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                      }}
                      onClick={() => removeModuleNameField(index)}
                    >
                      - Delete
                    </button>
                  </Box>
                </Box>
              ))}
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <button
                  type="button"
                  onClick={addModuleNameField}
                  style={addButtonStyle1}
                >
                  + Add more
                </button>
                <button
                  type="submit"
                  style={addButtonStyle2}
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

export default SetModules;
