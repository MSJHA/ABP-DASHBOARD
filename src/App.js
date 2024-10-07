
import React from 'react';
import './App.css';
import '../src/UsersList/responsive/base.css';
import { createBrowserRouter, RouterProvider, Routes } from 'react-router-dom';
import routes from './routes';

const App = () => {
  const router = createBrowserRouter(routes);

  return (
    <RouterProvider router={router}>
      <Routes />
    </RouterProvider>
  );
}

export default App;
