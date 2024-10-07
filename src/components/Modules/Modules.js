import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { FaUserPlus, FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Modules = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['userId']);
  const [user, setUser] = useState();
  const [name, setName] = useState('');
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [filter, setFilter] = useState({ name: "" });
  const [hasNextPageData, setHasNextPageData] = useState(false);


  const getData = useCallback(() => {
    axios
      .get(`http://localhost:8000/system/module/list?role_name=${filter.name}&page=${currentPage}&limit=${recordsPerPage}`)
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
      navigate('/');
    }
  }, [cookies, navigate]);

  useEffect(() => {
    getData();
  }, [getData], name);

  const handleEditClick = () => {
    navigate('/editmodules');
  };

  const handleEdit = (moduleId) => {
    navigate('/updatemodules', { state: { moduleId } });
  };

  const handleDelete = async (roleId) => {
    try {
      await axios.delete(`http://localhost:8000/moduledel/${roleId}`, {
        data: { deleted_by: user.id }
      });
      console.log('Module deleted successfully!');
      getData();
      toast.error('Module deleted successfully!', {
        position: "top-right",
        autoClose: 1000,
        theme: "colored",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } catch (error) {
      console.error('Error deleting module:', error);
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

  const TableRow = ({ data }) => (
    <tr>
      <td style={TextContainer}>{data.id}</td>
      <td style={TextContainer1}>{data.module_name} </td>
      <td>
        <button style={addButtonStyle3} onClick={() => handleEdit(data.id)}><FaEdit /></button>
        <button style={addButtonStyle1} onClick={() => handleDelete(data.id)}>Delete Module</button>
      </td>
    </tr>
  );

  return (
    <>
      <div>
        <div style={containerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Id</th>
                <th style={thStyle1}>Modules</th>
                <th style={thStyle2}>
                  <button onClick={handleEditClick} style={{ ...addButtonStyle2 }}>
                    <FaUserPlus /> Add Module
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
              <button
                className="page-link-next"
                onClick={nextPage}
                disabled={currentPage === totalPages || totalPages === 1}
                style={buttonStyle}
              >
                Next
              </button>
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
  width:'98%',
};

const tableStyle = {
  borderCollapse: 'collapse',
  width: '100%',
  marginTop: '50px',
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
  width: '1200px',
};
const thStyle2 = {
  border: '0px transparent white',
  padding: '10px',
  borderBottom: '2px solid white',
  color: 'white',
  fontSize: '20px'
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
const TextContainer1 = {
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
};

const addButtonStyle2 = {
  padding: '10px 12px',
  border: 'none',
  backgroundColor: 'green',
  color: 'white',
  cursor: 'pointer',
  borderRadius: '10px',
fontWeight: 'bold',
margin: '0px 0px 0px 36px'

};

const addButtonStyle3 = {
  padding: '10px 12px',
  margin: '8px',
  border: 'none',
  backgroundColor: 'white',
  color: 'green',
  cursor: 'pointer',
  borderRadius: '3px',
};

export default Modules;
