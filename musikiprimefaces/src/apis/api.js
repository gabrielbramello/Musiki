import axios from 'axios';

// Ajuste a URL para a porta interna 8080, onde o Spring está rodando
const BASE_URL = "http://spring-app:8081/api";

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
    }
});
