import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/order/";

class OrderService {
    getOrderHistory() {
        return axios
            .get(API_URL + "get", {headers: authHeader()})
            .then(response => {
                if (response.data.status === 200) {
                    return response.data.data.order;
                }
            })
            .catch(error => {
                throw Error(error.response.data.data.error_message)
            });
    }

    createOrder(productId) {
        let data = {
           productId: productId
        }
        return axios
            .post(API_URL + "create", data,{headers: authHeader()})
            .then(response => {
                if (response.data.status === 200) {
                    return response.data.data.order;
                }
            })
            .catch(error => {
                throw Error(error.response.data.data.error_message)
            });
    }
}

export default new OrderService();