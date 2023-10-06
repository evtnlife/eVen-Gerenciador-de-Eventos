import a from 'axios';
import global from '../global/config';
import Storage from '../global/storage';

const Axios = a.create({
    baseURL: global.api.url,
    timeout: 1000,
    headers: {
        'Accept': 'application/json',
    }
});
Axios.interceptors.response.use(response => {
     return response;
}, error => {
     console.log(error);
     if (error.response.status === 401) {
         Storage.removeItem('user');
     }
     return error;
});
export default Axios;
