import axios from 'axios';
const BASE_URL = "http://localhost:8082/api"

export default axios.create({
    baseURL:BASE_URL,
    mode:'cors',
    headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
    }
});
