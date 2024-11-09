import axios from 'axios';
//const BASE_URL = "https://musiki-api.onrender.com:8082/api"

const BASE_URL = "http://52.14.103.239/:8081/api"

export default axios.create({
    baseURL:BASE_URL,
    mode:'cors',
    headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
    }
});
