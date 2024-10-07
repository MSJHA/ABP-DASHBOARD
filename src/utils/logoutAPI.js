
// import axios from 'axios';
// import { api,apiUrl } from '../plugin/axios';
import Cookies from 'universal-cookie';
import axios from '../plugin/axios'

const cookies = new Cookies();

const deleteCookie = (cookieName) => {  

  console.log('test print',cookies.get('connect.sid'));
  cookies.remove(cookieName);
  localStorage.removeItem('token')
};

const logoutAPI = async () => { ;
  try {
    // const cookie = document.cookie;
    // console.log("cookies",cookies);
    const response = await axios.get('/Logout');
 
    deleteCookie('cookieId');
    deleteCookie('userId');
    // deleteCookie('toastShown');
    deleteCookie('connect.sid');
   
    return true; // Indicates successful logout 
  } catch (error) {
    console.error('Logout failed:', error.message);
    // Handle the error appropriately, you might want to redirect or show an error message
    return false; // Indicates failed logout
  }
};

export default logoutAPI;


