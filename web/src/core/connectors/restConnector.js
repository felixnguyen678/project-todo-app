import axios from 'axios';

const restConnector = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

restConnector.defaults.headers.common['Authorization'] = 'abc';

export default restConnector;

