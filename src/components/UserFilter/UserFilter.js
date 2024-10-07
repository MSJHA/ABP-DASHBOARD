import React from 'react';
import './UserFilter.css';
const UserFilter = ({ nameFilter, emailFilter, handleNameFilterChange, handleEmailFilterChange }) => {
  return (
    // <div className="filter-container">
    <div className="filter-container">
      <input
        className='input nameInput' /* Apply classes */
        type="text"
        placeholder="Enter the name"
        value={nameFilter}
        onChange={handleNameFilterChange}
      />
      <input
        className='input emailInput' /* Apply classes */
        type="text"
        placeholder="Enter the email"
        value={emailFilter}
        onChange={handleEmailFilterChange}
      />
    </div>
  );
};

export default UserFilter;
