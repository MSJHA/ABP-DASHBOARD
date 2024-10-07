import React, { useState, useEffect, useCallback } from 'react';
import './Userclone.css';
import axios from '../plugin/axios';

// import { faEdit } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../newcomponents/Sidebar';
import { list } from 'fontawesome';
// import { useCookies } from 'react-cookie';


const TableRow = ({ data, onEditClick }) => (
  <tr>
    <td style={TextContainer}>{data.id}</td>
    <td style={TextContainer}>{data.name}</td>
    <td style={TextContainer}>{data.email}</td>
    <td style={TextContainer}>{data.contactNO}</td>
    <td style={TextContainer}>
      {/* <button onClick={() => onEditClick(data)} style={buttonStyle}>
         Assign Roles
      </button>  */}
    </td>
  </tr>
);
      

function UsersList(){
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10); 
  const [filter,setFilter] = useState({
    name:"",
    email:""
  });

 
  const countData = () => {
    axios
      .get('http://localhost:8000/system/user/count')
      .then((response)=>{
        const counted =response.data.totalCount;
        const recordsPer =response.data.recordsPerPage;
        setTotalPages(Math.ceil(counted / recordsPer));
        setRecordsPerPage(recordsPer);
      })
      .catch((error) => {
        console.error('Error fetching total count:', error);
      });
  }

  const getData = useCallback(() => {
    axios
      .get(`http://localhost:8000/system/user/list?name=${filter.name}&email=${filter.email}&page=${currentPage}&limit=${recordsPerPage}`)
      .then((response) => {
        const responseData = response.data;
        if (Array.isArray(responseData)) {
          setData(responseData);
        } else {
          console.error('API response is not an array:', responseData);
        }
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, [currentPage, recordsPerPage, name,email]);

  useEffect(() => {
    countData();
  }, [countData]);

  useEffect(() => {
    getData();
  }, [getData],name,email);

  const handleChange=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setFilter({...filter,[name]:value});
  }

  const handleSearch=(e)=>{
    e.preventDefault();
    setName(filter.name);
    setEmail(filter.email);
    getData();
  }

  const navigate = useNavigate();
  const handleEditClick = (rowData) => {
    // Handle edit action, for example, navigate to an edit page
    navigate('/assingrole');
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

  return (
    <>
        <div style={containerStyle}>
          <input
            type="text"
            name="name"
            id=""
            placeholder="Name..."
            value={filter.name}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            id=""
            autoComplete='off'
            placeholder="Email..."
            value={filter.email}
            onChange={handleChange}
            style={{ ...inputStyle, marginLeft: '20px' }} 
          />
          <button onClick={handleSearch} onChange={handleChange} className="search-search">
            Search
          </button>
          
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Id</th>
                <th style={thStyle}>Firstname</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>ContactNo</th>

              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <TableRow key={index} data={item} onEditClick={handleEditClick} />
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
    </>
  );
}

const containerStyle = {
  backgroundColor: '#371a49',
  padding: '20px',
  width:'100%'
};

const tableStyle = {
  borderCollapse: 'collapse',
  width: '100%',
  marginTop: '20px',
};

const thStyle = {
  border: '0px transparent white',
  padding: '10px',
  textAlign: 'left',
  borderBottom: '2px solid white',
  color: 'white',
  fontSize: '20px',
  fontWeight: '900px',
};

const inputStyle = {
  padding: '8px',
  marginBottom: '10px',
  width: '20%',
  border: '2px solid #ccc',
  borderRadius: '3px',
};

const buttonStyle = {
  padding: '8px 12px',
  margin: '0 5px',
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

export default UsersList;
