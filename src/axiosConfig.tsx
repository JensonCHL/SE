import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5173/api/calendar', // Adjust the base URL according to your backend API endpoint
  withCredentials: true, // Enable credentials for cross-origin requests
});

export default instance;
