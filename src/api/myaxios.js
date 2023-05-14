import axios from "axios";

const myaxios = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 30000
});

export default myaxios;