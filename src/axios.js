import axios from 'axios';

const instance = axios.create({
    baseURL : 'http://127.0.0.1:8000/'
})

let eToken = 'AUTH TOKEN FROM INSTANCE'
const token = localStorage.getItem('token');
const email = localStorage.getItem('email');
if(!!email && !!token){
    eToken  = `Token ${token}`;
}

instance.defaults.headers.common['Authorization'] = eToken;


export default instance;
