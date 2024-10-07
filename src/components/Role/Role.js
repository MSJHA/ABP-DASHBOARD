import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { FaUserPlus, FaPlus} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Role = () => {
    const navigate = useNavigate();
    const [cookies] = useCookies(['userId']); 
    const [user, setUser] = useState(); 

    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10); 
    const [filter,setFilter] = useState({name:""});
    const [hasNextPageData, setHasNextPageData] = useState(false);
   
    const countData = useCallback(() => {
      axios
      .get('http://localhost:8000/system/role/count')
        .then((response)=>{
          const counted =response.data.totalCount;
          const recordsPer =response.data.recordsPerPage;
          setTotalPages(Math.ceil(counted / recordsPer));
          setRecordsPerPage(recordsPer);
        })
        .catch((error) => {
          console.error('Error fetching total role:', error);
        });
    },[]);

    const getData = useCallback(() => {
      axios
      .get(`http://localhost:8000/system/role/list?role_name=${filter.name}&page=${currentPage}&limit=${recordsPerPage}`)
      .then((response) => {
          const responseData = response.data;
          if (Array.isArray(responseData)) {
              setData(responseData);
            
              if (responseData.length > 0) {
                  setHasNextPageData(true);
              } else {
                  if (currentPage !== 1) {
                      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
                  }
                  setHasNextPageData(false);
              }
          } else {
              console.error('API response is not an array:', responseData);
          }
      })
      .catch((err) => {
          console.error('Error fetching data:', err);
      });
  }, [currentPage, recordsPerPage, filter.name]);
  

    useEffect(() => {
      const userIdFromCookie = cookies.userId;
      if (userIdFromCookie) {
        setUser({ id: userIdFromCookie });
      } else {
        navigate('/login');
      }
    }, [cookies, navigate]);

    useEffect(() => {
      countData();
    }, [countData]);
  
    useEffect(() => {
      getData();
    }, [getData],name);
  
      const handleChange=(e)=>{
      const name=e.target.name;
      const value=e.target.value;
      setFilter({...filter,[name]:value});
    }
  
    const handleSearch=(e)=>{
      e.preventDefault();
      setName(filter.name);
      getData();
    }   

      const handleAddRole = (e) => {
        const roleNameInput = e.target.parentNode.querySelector('input[name="roleName"]');
        const roleName = roleNameInput.value;
    
        if (roleName) {
          axios.post('http://localhost:8000/addRole', { role_name: roleName, created_by: user.id })
            .then(response => {
              console.log('New role added successfully:', response.data);
              roleNameInput.value = '';
              getData();
              toast.success('Role added successfully!', {
                position: 'top-right',
                autoClose: 1000,
                theme: 'colored',
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            })
            .catch(error => {
              console.error('Error adding new role:', error);
              toast.error('Role already exists!',{
                position:"top-right" ,
                autoClose: 1000,
                theme:"colored",
                hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
              })
            });
        }
      };

    const handleDelete = async (roleId) => {
  try {
    await axios.delete(`http://localhost:8000/deleteRole/${roleId}`, {
      data: { deleted_by: user.id }
    });
    console.log('Role deleted successfully!');
    getData();
    toast.error('Role deleted successfully!',{
      position:"top-right" ,
      theme:"colored",
      hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
    })
  } catch (error) {
    console.error('Error deleting role:', error);
  }
};

    const prePage = () => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
  
    const changeCPage = (id) => {
      setCurrentPage(id);
    };
  
    const nextPage = () => {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
    
   useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
      }
    }, [navigate]);

    const handleClick = (roleId,module_name) => {
      navigate('/setmodules', { state: { roleId,module_name } });
    };
    
    const TableRow = ({ data}) => (
  <tr>
    <td style={TextContainer}>{data.id}</td>
    <td style={TextContainer}>{data.role_name}</td>
    <td>
    <button style={addButtonStyle3} onClick={() => handleClick(data.id)}><FaPlus /></button>
      <button style={addButtonStyle1} onClick={() => handleDelete(data.id)}>Delete Role</button>
    </td>
  </tr>
);

    return (
      <>
      <div>
        <div style={containerStyle}>
          <input
            type="text"
            name="name"
            id=""
            placeholder="Role Name.."
            value={filter.name}
            onChange={handleChange}
            style={inputStyle4}
          />
          <button onClick={handleSearch} onChange={handleChange} className="search-search" style={{ ...addButtonStyle4 }}>
            Search
          </button>

          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Id</th>
                <th style={thStyle1}>Roles</th>
                <th style={thStyle2}>
                  <input
                    type="text"
                    name="roleName"
                    placeholder="Roles.."
                    style={inputStyle5}
                  />
                  <button onClick={handleAddRole} style={{ ...addButtonStyle2 }}>
                    <FaUserPlus /> Add Role
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <TableRow key={index} data={item} />
              ))}
            </tbody>
        </table>
        <div style={{ width: '100%', height: '2px', background: 'white' }}></div>

          <nav className="nav">
            <div className="abc">
              <ul>
                <button
                  className="page-link-prev"
                  onClick={prePage}
                  disabled={currentPage === 1}
                  style={buttonStyle}
                >
                  Prev
                </button>
              </ul>
            </div>
          
            <ul>
            {totalPages > 1 && hasNextPageData && (
              <button
                className="page-link-next"
                onClick={nextPage}
                disabled={currentPage === totalPages || totalPages === 1}
                style={buttonStyle}
              >
                Next
              </button>
              )}
            </ul>
          </nav>
      </div>
    </div>
    <ToastContainer />
    </>
  );
};

const containerStyle = {
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#371a49',
  padding: '20px',
  width:'100%'
};

const tableStyle = {
  borderCollapse: 'collapse',
  width: '100%',
  marginTop: '47px',  
  
};

const thStyle = {
  border: '0px transparent white',
  padding: '10px',
  textAlign: 'left',
  borderBottom: '2px solid white',
  color: 'white',
  fontSize: '20px',

};
const thStyle1 = {
  border: '0px transparent white',
  padding: '10px',
  textAlign: 'left',
  borderBottom: '2px solid white',
  color: 'white',
  fontSize: '20px',
  width: '1031px'
};
const thStyle2 = {
  border: '0px transparent white',
  padding: '10px',
  textAlign: 'left',
  borderBottom: '2px solid white',
  color: 'white',
  fontSize: '20px',
};

const inputStyle4 = {
  padding: '8px',
  width: '15%',
  border: '2px solid #ccc',
  borderRadius: '3px',
};
const inputStyle5 = {
  padding: '8px ',
  width: '60%',
  border: '2px solid #ccc',
  borderRadius: '3px',
  
};

const buttonStyle = {
  padding: '8px 12px',
  border: 'none',
  backgroundColor: '#4285f4',
  color: 'white',
  cursor: 'pointer',
  borderRadius: '3px',
};

const TextContainer = {
  fontSize: '20px',
  color: 'white',
  padding: '10px',
};

const addButtonStyle1 = {
  padding: '10px 12px',
  margin: '10px 0',
  border: 'none',
  backgroundColor: 'white',
  color: 'red',
  fontWeight: 'bold',
  cursor: 'pointer',
  borderRadius: '6px',
  position: 'relative',
  left:'172px'
 
};

const addButtonStyle2 = {
  padding: '10px ',
  border: 'none',
  backgroundColor: 'green',
  color: 'white',
  cursor: 'pointer',
  borderRadius: '10px',
  textAlign: 'right',
  float: 'right',
  fontWeight: 'bold',
};

const addButtonStyle3 = {
  padding: '10px 12px',
  margin: '10px 10px',
  border: 'none',
  backgroundColor: 'white',
  color: 'green',
  cursor: 'pointer',
  borderRadius: '3px',
  position: 'relative',
    left: '169px'
};
const addButtonStyle4 = {
  padding: '10px 12px',
  border: 'none',
  cursor: 'pointer',
  color: 'white',
  borderRadius: '10px',
  textAlign: 'right',
};

export default Role;