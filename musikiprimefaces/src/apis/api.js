import axios from 'axios';
const BASE_URL = "https://musiki-api.onrender.com:8082/api"

export default axios.create({
    baseURL:BASE_URL,
    mode:'cors',
    headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
    }
});
