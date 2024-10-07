
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000', // Replace with your API base URL
  withCredentials: true
});

export default instance


