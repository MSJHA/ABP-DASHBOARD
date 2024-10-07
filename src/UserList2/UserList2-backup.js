// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

// const TableRow = ({ data }) => (
//   <tr>
//     <td style={TextContainer}>{data.Id}</td>
//     <td style={TextContainer}>{data.Firstname}</td>
//     <td style={TextContainer}>{data.Lastname}</td>
//     <td style={TextContainer}>{data.Email}</td>
//     <td style={TextContainer}>{data.ContactNo}</td>
//     <td style={TextContainer}>{data.Action}</td>
//   </tr>
// );

// const UserList2 = () => {
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchTermm, setSearchTermm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 10;
//   const recordsPerPage = 4;

//   const getData = useCallback(() => {
//     axios
//       .get(`http://localhost:8081/page?name=${searchTerm}&limit=${searchTermm}`)
//       .then((response) => {
//         const responseData = response.data;
  
//         if (Array.isArray(responseData)) {
//           setData(responseData);
//         } else {
//           console.error('API response is not an array:', responseData);
//         }
//       })
//       .catch((err) => {
//         console.error('Error fetching data:', err);
//       });
//   }, [currentPage, recordsPerPage]);

//   useEffect(() => {
//     getData();
//   }, [currentPage, getData]);

//   const filterData = (searchTerm) => {
//     return data.filter(
//       (item) =>
//         item.Firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.createdBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.actions.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   };

//   const handleSearch = (e) => {
//     const searchTerm = e.target.value.toLowerCase();
//     setSearchTerm(searchTerm);
//     setCurrentPage(1); // Reset to the first page when searching
//   };

//   const handleSearchh = (e) => {
//     const searchTermm = e.target.value.toLowerCase();
//     setSearchTermm(searchTermm);
//     setCurrentPage(1); // Reset to the first page when searching
//   };

//   const filteredData = searchTerm ? filterData(searchTerm) : data;
//   const totalPages = Math.ceil(filteredData.length / pageSize);
//   const startIndex = (currentPage - 1) * pageSize;
//   const endIndex = startIndex + pageSize;
//   // const currentData = filteredData.slice(startIndex, endIndex);

//   const changePage = (page) => {
//     setCurrentPage(page + 1);
//   };
//   const currentData = Array.isArray(filteredData) ? filteredData.slice(startIndex, endIndex) : [];

//   // ... (other code)

//   useEffect(() => {
//     // Log the filtered data to help identify the issue
//     console.log('filteredData:', filteredData);
//     setCurrentPage(1); // Reset current page to 1 when totalPages changes
//   }, [totalPages, filteredData]);

//   useEffect(() => {
//     setCurrentPage(1); // Reset current page to 1 when totalPages changes
//   }, [totalPages]);

//   return (
//     <div>
//       <div style={containerStyle}>
//         <input
//           type="text"
//           placeholder="Name..."
//           value={searchTerm}
//           onChange={handleSearch}
//           style={inputStyle}
//         />

//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>Id</th>
//               <th style={thStyle}>Firstname</th>
//               <th style={thStyle}>Lastname</th>
//               <th style={thStyle}>Email </th>
//               <th style={thStyle}>Contactno</th>
//               <th style={thStyle}>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentData.map((item, index) => (
//               <TableRow key={index} data={item} />
//             ))}
//           </tbody>
//         </table>
//         <div style={{ width: '100%', height: '2px', background: 'white' }}></div>
//         <div style={paginationStyle}>
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index}
//               onClick={() => changePage(index)}
//               style={index + 1 === currentPage ? activeButtonStyle : buttonStyle}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Styles
// const activeButtonStyle = {
//   padding: '8px 12px',
//   margin: '0 5px',
//   border: 'none',
//   backgroundColor: 'grey',
//   color: 'white',
//   cursor: 'pointer',
//   borderRadius: '3px',
//   fontWeight: 'bold', // Highlighting style for the active button
// };

// const containerStyle = {
//   fontFamily: 'Arial, sans-serif',
//   backgroundColor: '#371a49',
//   padding: '20px',
//   height: '100vh',
// };

// const tableStyle = {
//   borderCollapse: 'collapse',
//   width: '100%',
//   marginTop: '20px',
// };

// const thStyle = {
//   border: '0px transparent white',
//   padding: '10px',
//   textAlign: 'left',
//   borderBottom: '2px solid white',
//   color: 'white',
//   fontSize: '20px',
//   fontWeight: '900px',
// };

// const inputStyle = {
//   padding: '8px',
//   marginBottom: '10px',
//   width: '20%',
//   border: '2px solid #ccc',
//   borderRadius: '3px',
// };

// const paginationStyle = {
//   marginTop: '20px',
// };

// const buttonStyle = {
//   padding: '8px 12px',
//   margin: '0 5px',
//   border: 'none',
//   backgroundColor: '#4285f4',
//   color: 'white',
//   cursor: 'pointer',
//   borderRadius: '3px',
// };

// const TextContainer = {
//   fontSize: '20px',
//   color: 'white',
//   padding: '10px',
// };

// export default UserList2;
