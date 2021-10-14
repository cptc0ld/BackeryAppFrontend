import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/product/";

class ProductService {
    addProduct(name, list_of_ingredient_id) {
        const products = {
                "name" : name,
                "ingredientsPresent" : list_of_ingredient_id
        }
        return axios
            .post(API_URL + "products/add", {
                products
            }, { headers: authHeader() })
            .then(response => {
                if(response.data.status === 200){
                    return response.data.data.message;
                }
            })
            .catch(error => {
                throw Error(error.response.data.data.error_message)
            });
    }

    getIngredients() {
        return axios
            .get(API_URL + "ingredients/all",{ headers: authHeader() })
            .then(response => {
                if(response.data.status === 200){
                    return response.data.data.ingredients;
                }
            })
            .catch(error => {
                throw Error(error.response.data.data.error_message)
            });
    }
}

export default new ProductService();