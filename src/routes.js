import Dashboard from './pages/Dashboard.js';
import UserList2 from './UserList2/UserList2';
import ChangePassword from "../src/components/ChangePassword/ChangePassword.js"; 
import LoginSignup from './LoginSignup/LoginSignup.jsx';
import Signup from './Signup/Signup.jsx';
import Layout from './layout.js'; 
import Profiledata from '../src/components/profiledata/profiledata.js';
import Changeprofile from './components/changeprofile/changeprofile.js';
import UsersList from './UsersList/UsersList.js';
import Rechart from './UserList2/rechart.js';
import Role from './components/Role/Role.js';
import Modules from './components/Modules/Modules.js';
import Addmodules from './components/Modules/Addmodules.js';
import Updatemodules from './components/Modules/Updatemodules.js';
import Setmodules from './components/Modules/SetModules.js';

const routes = [
  {
    path: '/',
    element: <LoginSignup />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    layout: "mainlayout",
    children: [
      {
        path: '/UserList2',
        element: <UserList2 />,
      },
      {
        path:'/profiledata',
        element: <Profiledata/>
      },
      {
        path:'/changing',
        element: <Changeprofile/>
      },
      {
        path: '/ChangePassword',
        element: <ChangePassword />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/UserSList',
        element:
              <UsersList />
         },
         {
          path: '/graphchart/:user_login_id',
          element:
                <Rechart/>
           },
         {
          path: '/assignrole',
          element:
                <Role/>
           },
         {
          path: '/modules',
          element:
                <Modules/>
           },
         {
          path: '/editmodules',
          element:
                <Addmodules/>
           },
         {
          path: '/updatemodules',
          element:
                <Updatemodules/>
           },
         {
          path: '/setmodules',
          element:
                <Setmodules/>
           }
    ].map(route => ({
      ...route,
      element: <Layout>{route.element}</Layout>, 
    }))
  }
];

export default routes;
