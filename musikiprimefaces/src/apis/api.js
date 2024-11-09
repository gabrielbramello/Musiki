import axios from 'axios';

// Ajuste a URL para a porta interna 8080, onde o Spring está rodando
const BASE_URL = "http://ec2-52-14-103-239.us-east-2.compute.amazonaws.com:8081/api";

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
    }
});
