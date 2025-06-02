import axios from 'axios';

//const API_URL = process.env.REACT_APP_API_URL;
//const PORTA_REACT = process.env.REACT_APP_PORTA;

//console.log('REACT_APP_API_URL:', API_URL); // Deve imprimir "localhost"
//console.log('REACT_APP_API_URL:', PORTA_REACT); // Deve imprimir "8081"

//const BASE_URL = `http://${API_URL}:${PORTA_REACT}/api`;

const BASE_URL = `http://localhost:8081/api`;

console.log('BASE_URL:', BASE_URL); // Deve imprimir "8081"


export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});