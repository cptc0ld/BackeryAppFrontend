import axios from "axios";

const API_URL = "http://localhost:8000/api/account/";

class AuthService {
    login(email, password) {
        return axios
            .post(API_URL + "login", {
                email,
                password
            })
            .then(response => {
                if (response.data.status === 200) {
                    if (response.data.data.token) {
                        localStorage.setItem("user", JSON.stringify(response.data.data));
                    }

                    return response.data.data;
                }
            })
            .catch(error => {
                throw Error(error.response.data)
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password, password2) {
        return axios.post(API_URL + "register", {
            username,
            email,
            password,
            password2
        })
            .then(response => {
                if (response.data.status === 200) {
                    if (response.data.data.token) {
                        localStorage.setItem("user", JSON.stringify(response.data.data));
                    }

                    return response.data.data;
                }
            })
            .catch(error => {
                throw Error(error.response.data.data.error_message)
            });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
        ;
    }
}

export default new AuthService();