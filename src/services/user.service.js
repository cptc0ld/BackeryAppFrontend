import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/api/product/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'products/all', { headers: authHeader() });
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.post(API_URL + 'products/add', { headers: authHeader() });
    }
}

export default new UserService();