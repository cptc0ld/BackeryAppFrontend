import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/product/";

class ProductService {
    addProduct(name, list_of_ingredient) {
        const data = {
            "product": {
                'name': name
            },
            "ingredients": list_of_ingredient
        }
        return axios
            .post(API_URL + "products/add", data, {headers: authHeader()})
            .then(response => {
                if (response.data.status === 200) {
                    return response.data.data;
                }
            })
            .catch(error => {
                throw Error(error.response.data.data.error_message)
            });
    }

    getIngredients() {
        return axios
            .get(API_URL + "ingredients/all", {headers: authHeader()})
            .then(response => {
                if (response.data.status === 200) {
                    return response.data.data.ingredients;
                }
            })
            .catch(error => {
                throw Error(error.response.data.data.error_message)
            });
    }

    getProductById(ID) {
        return axios
            .get(API_URL + "product/" + ID, {headers: authHeader()})
            .then(response => {
                if (response.data.status === 200) {
                    return response.data.data.product;
                }
            })
            .catch(error => {
                throw Error(error.response.data.data.error_message)
            });
    }

    editProduct(id, name, file) {
        const formData = new FormData()
        if (file !== null) {
            formData.append(
                'image',
                file,
                file.name
            )
        }
        if (id !== '') {
            formData.append(
                'id',
                id
            )
        }
        if (name !== '') {
            formData.append(
                'name',
                name
            )
        }
        return axios.put(API_URL + "product/update", formData, {headers: authHeader()})
            .then(response => {
                if (response.data.status === 200) {
                    return response.data.data.message;
                }
            })
            .catch(error => {
                console.log(error.data)
                return error.data;
            });
    }

    deleteProduct(id) {
        return axios.delete(API_URL + "product/delete/" + id, {headers: authHeader()})
            .then(response => {
                if (response.data.status === 200) {
                    return response.data.data.message;
                }
            })
            .catch(error => {
                console.log(error.data)
                throw Error(error.response.data.error_message);
            });
    }

    addIngredients(name, costPrice, file) {
        console.log(name, costPrice, file)
        const formData = new FormData()
        if (file !== null) {
            formData.append(
                'image',
                file,
                file.name
            )
        }
        if (name !== '') {
            formData.append(
                'name',
                name
            )
        }
        if (costPrice !== '') {
            formData.append(
                'costPrice',
                costPrice
            )
        }
        return axios
            .post(API_URL + "ingredient/add", formData, {headers: authHeader()})
            .then(response => {
                if (response.data.status === 200) {
                    return response.data.data;
                }
            })
            .catch(error => {
                throw Error(error.response.data.data.error_message)
            });
    }


    getIngredientById(ID) {
        return axios
            .get(API_URL + "ingredient/" + ID, {headers: authHeader()})
            .then(response => {
                if (response.data.status === 200) {
                    return response.data.data.ingredient;
                }
            })
            .catch(error => {
                throw Error(error.response.data.data.error_message)
            });
    }

}

export default new ProductService();