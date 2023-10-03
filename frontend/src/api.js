import axios from 'axios';
import keys from './config/keys';

const baseURL = keys.REACT_APP_BACKEND_URL || 'http://localhost:8000';
const api = axios.create({
  baseURL: `${baseURL}`,
});

export default api;