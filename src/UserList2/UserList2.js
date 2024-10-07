import React, { useState, useEffect, useCallback , useRef} from 'react';
import './UserList2.css';
import axios from '../plugin/axios';
import Sidebar from '../newcomponents/Sidebar';
import { useNavigate } from 'react-router-dom';


const TableRow = ({ data }) => {
  const { Action, id, user_login_id, google_user_email, google_user_picture, registration_source, user_name, device_type, channel_name, registration_date } = data;
  const dialog = useRef();
  const [userData, setUserData] = useState(null);
  const[userName , setUserName]= useState(null);
  const[useCreateDate, setUseCreateDate]= useState(null);
  const[useUpdateDate, setUseUpdateDate]= useState(null);
  const[useTotalCount, setUseTotalCount]= useState(null);
  console.log(google_user_picture);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => {
    dialog.current.showModal();
    document.body.classList.add('blurred');
    setDialogOpen(true);
  };

  const closeDialog = () => {
    dialog.current.close();
    document.body.classList.remove('blurred');
    setDialogOpen(false);
  };
  const getingUserData = (userid) => {
    axios
      .get(`http://localhost:8000/getUserData/${userid}`)
      .then((response) => {
       console.log(response.data[0].google_user_email);
        setUserData(response.data[0].google_user_email);
        setUserName(response.data[0].user_name);
        setUseCreateDate(response.data[0].created_at);
        setUseTotalCount(response.data[1].length);
        setUseUpdateDate(response.data[1][0].updated_at);
      //   console.log(response.data[0].created_at);
      // console.log(response.data[1].length);
      // console.log(response.data[1][0].updated_at);
      })
      .catch((error) => {
        console.error('Error fetching user id:', error);
      });
  }
  // const getingUserSessionData = (userid) => {
  //   axios
  //     .get(`http://localhost:8000/getUserSessionData/${userid}`)
  //     .then((response) => {
  //       console.log(response.data);
        
  //       setUseCreateDate(response.data.created_at);
  //       setUseUpdateDate(response.data.updated_at)
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching user session data:', error);
  //     });
  // }
  
   const navigate = useNavigate();

  const handleActionClick = () => {
    navigate(`/graphchart/${user_login_id}`);
  };

  return (
    <tr style={{ alignItems: 'center', justifyContent: 'center' }}>
      <td>{user_login_id}</td>
      <td>{google_user_email}</td>
     
      <td>{google_user_picture && (
      <img src={google_user_picture}
      alt="Google User Picture" 
      className="mypic"
      />)}</td>
      <td>{registration_source}</td>
      <td>{user_name}</td>
      <td>{device_type}</td>
      <td>{channel_name}</td>
      <td>{formatDate(registration_date)}</td>
      <td>
      <a href="" onClick={handleActionClick}>
          {Action || (
           <>
           <img
             src={require('../../src/newcomponents/assets/graph.png')}
             alt="graph img"
             style={{ width: '30px', height: '30px', marginRight: '10px' }}
             className="responsive-icon"
           />
          
         </>
          )}
        </a>
        <i
        className="fa-regular fa-eye responsive-icon"
        style={{ fontSize: '30px', marginLeft: '10px' }}
        onClick={() => {
          openDialog();
          getingUserData(id);
         
        }}
      ></i>
      <dialog ref={dialog}  className="user-details-dialog">  
    <h1>USER DETAILS</h1>
    <br />
    <img src={google_user_picture} alt="Google User Picture" className="dialogpic"/>
    <br></br>
    <p><strong>User ID:</strong> {user_login_id}</p>
    <br></br>
    <p><strong>Email:</strong> {userData}</p>
    <br></br>
    <p><strong>Name:</strong> {userName}</p>
    <br></br>
    <p><strong>Registration Date:</strong> {formatDate(registration_date)}</p>
    <br></br>
    <p><strong>Registration Source:</strong> {registration_source}</p>
    <br></br>
    <p><strong>Created At:</strong> {formatDate(useCreateDate)}</p>
    <br></br>
    <p><strong>Updated At:</strong> {formatDate(useUpdateDate)}</p>
    <br></br>
    <p><strong>Login Count:</strong> {useTotalCount}</p>
    <button onClick={closeDialog}>Close</button>
    </dialog>
      </td>

    </tr>
   
  );
};

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}
   ${hours}:${minutes}:${seconds}`;
}

function UserList2() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);


  const localData = [

  ];
 
  const [data, setData] = useState(localData);
  const [userCount, setUserCount] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loginId, setLoginId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [filter, setFilter] = useState({
    name: "",
    email: "",
    loginId: "",
    channelOption: "",
    deviceOption:""
    
    
  });
  const [selectedChannelOption, setSelectedChannelOption] = useState('');
  const [selectedDeviceOption, setSelectedDeviceOption] = useState('');

  const countData = () => {
    axios
      .get('http://localhost:8000/totalcount')
      .then((response) => {
        const counted = response.data.totalCount;
        const recordsPer = response.data.recordsPerPage;
        setTotalPages(Math.ceil(counted / recordsPer));
        setRecordsPerPage(recordsPer);
      })
      .catch((error) => {
        console.error('Error fetching total count:', error);
      });
  }
  const getData = useCallback(() => {
    axios
      .get(`http://localhost:8000/user/list`,
        {
          params: {
            "name": filter.name,
            "email": filter.email,
            "loginId": filter.loginId,
            "page": currentPage,
            "limit": recordsPerPage,
            "channelName": selectedChannelOption,
            "deviceType": selectedDeviceOption
          }
        })
      .then((response) => {
        const responseData = response.data;
        console.log(response.data, 'response>>>');
        setData(responseData?.users);
        setUserCount(responseData?.totalUser);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, [currentPage, recordsPerPage, filter, selectedChannelOption, selectedDeviceOption]);

  useEffect(() => {
    getData();
    countData();
  }, []);
 

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFilter({ ...filter, [name]: value });
  }
  const handleSearch = (e) => {
    e.preventDefault();
    setName(filter.name);
    setEmail(filter.email);
    setLoginId(filter.loginId);
    
    getData();  
  }

  const prePage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const changeCPage = (id) => {
    setCurrentPage(id);
    getData();
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };


  const handleChannelName = (event) => {
    setSelectedChannelOption(event.target.value);
  };

  const handleDeviceType = (event) => {
    setSelectedDeviceOption(event.target.value);
  };
  const firstPage = () => {
    setCurrentPage(1);
  };

  const lastPage = () => {
    setCurrentPage(totalPages);
  };
  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 5);
    let endPage = Math.min(startPage + 6, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };
  
 

  return (
    <>
        <div  className="containerStyle">
         <div class="search-panel">
  <form>
    <input
      type="text"
      name="name"
      placeholder="Name..."
      value={filter.name}
      onChange={handleChange}
      class="search-input"
    />
    <input
      type="text"
      name="loginId"
      placeholder="Login Id..."
      value={filter.loginId}
      onChange={handleChange}
      class="search-input"
    />
    <input
      type="email"
      name="email"
      autoComplete="off"
      placeholder="Email..."
      value={filter.email}
      onChange={handleChange}
      class="search-input "
    />
    <select class="search-select search-input" value={selectedChannelOption} onChange={handleChannelName} name="channelName">
      <option value="">Channel Name</option>
      <option value="hindi">Hindi</option>
      <option value="English">English</option>
    </select>
    <select class="search-select search-input" value={selectedDeviceOption} onChange={handleDeviceType} name="deviceType">
      <option value="">Device Type</option>
      <option value="Web">Web</option>
      <option value="M-Web">M-Web</option>
      <option value="App-Andriod">App-Andriod</option>
      <option value="App-ioS">App-ioS</option>
    </select>
    <button type="submit" onClick={handleSearch} class="search-button search-select search-input">Search</button>
  </form>
</div>

          <link />
          <div className='common'>
            <table className='tableStyle'>
              <thead >
                <tr >
                  <th style={thStyle}>LoginID</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Image</th>
                  <th style={thStyle}>Source</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Device</th>
                  <th style={thStyle}>Channel</th>
                  <th style={thStyle}>Reg-Date</th>
                  <th style={thStyle}>Action</th>

                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <TableRow key={index} data={item} />
                ))}
              </tbody>
            </table>

          </div>
          <div style={{ width: '100%', height: '2px', background: 'black' }}></div>


          <nav className="nav">
            <ul>
              <button className="page-link-first" onClick={firstPage} style={buttonStyle}>&lt;&lt; First</button>
              
            </ul>
            <ul>
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  className="page-link"
                  onClick={() => changeCPage(page)}
                  style={{
                    ...buttonStyle,
                    backgroundColor: currentPage === page ? null : '#4285f4',
                  }}
                >
                  {page}
                </button>
              ))}
            </ul>
            <ul>
              {/* <button className="page-link-next" onClick={nextPage} disabled={currentPage === totalPages} style={buttonStyle}>Next</button> */}
              <button className="page-link-last" onClick={lastPage} style={buttonStyle}>Last &gt;&gt;</button>
            </ul>
            <span style={{ marginLeft: '10px', color: 'white', padding: '5px 6px', margin: '0 5px', border: 'none', backgroundColor: '#4285f4', color: 'black', cursor: 'pointer', borderRadius: '3px' }}>
              Total record {userCount}
            </span>
          </nav>
        </div>
    </>
  );
}

const containerStyle = {
  
  backgroundColor: '#371a49',
  padding: '20px',
  width: '100%'
};

const tableStyle = {
  borderCollapse: 'collapse',
  width: '100%',
  marginTop: '20px',
  backgroundColor: 'white',
  padding: '5px',
  borderRadius: '10px'
};
const thStyle = {
  border: '0px transparent black',
  padding: '10px',
  textAlign: 'left',
  borderBottom: '2px solid black',
  color: 'black',
  fontSize: '18px',
  fontWeight: '1000px',
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
  color: 'black',
  cursor: 'pointer',
  borderRadius: '3px',
};

const TextContainer = {
  fontSize: '20px',
  color: 'black',
  padding: '10px',
};
export default UserList2;




