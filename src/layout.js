import React from 'react';
import Sidebar from './newcomponents/Sidebar';

const Layout = ({ children }) => {
  return (
    <Sidebar>
      {children}
    </Sidebar>
  );
};

export default Layout;

