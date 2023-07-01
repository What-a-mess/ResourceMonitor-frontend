import axios from "axios";

const myaxios = axios.create({
    baseURL: 'http://192.168.125.128:8080/api',
    timeout: 30000
});

export default myaxios;