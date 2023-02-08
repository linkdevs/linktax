//create axios instance
import axios from 'axios';

export const Api = axios.create({
    baseURL: '/api',
});
