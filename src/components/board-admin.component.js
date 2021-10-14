import React, { Component } from "react";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import ProductService from "../services/product.service";

export default class BoardUser extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.handleAddIngredients = this.handleAddIngredients.bind(this);
        this.handleListChange = this.handleListChange.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this)
        this.onChangeSellPrice = this.onChangeSellPrice.bind(this)
        this.state = {
            name:"",
            successful: false,
            message: "",
            ingredientsPresent: [],
            selectedIngredient: [],
            ingredientID: "",
            ingredientName: "",
            quantity : "",
            sellPrice: ""
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeQuantity(e) {
        this.setState({
            quantity: e.target.value
        });
    }

    onChangeSellPrice(e) {
        this.setState({
            sellPrice: e.target.value
        });
    }

    handleRegister(e) {
        e.preventDefault();
        let list_of_ingredients = [];
        this.state.selectedIngredient.forEach(ingredient =>{
            list_of_ingredients.push(ingredient.id)
        })
        ProductService.addProduct(
            this.state.name,
            list_of_ingredients
        )
            .then(
                response => {
                    this.setState({
                        message: response,
                        successful: true
                    });
                },
                error => {
                    console.log(JSON.stringify(error))
                    const resMessage = error.toString();

                    this.setState({
                        message: resMessage,
                        successful: false
                    });
                }
            )
    }

    handleListChange(e) {
        const data = e.target.value.split(",")
        console.log(data)
        this.setState({
            ingredientID: data[0],
            ingredientName: data[1]
        });
    }

    handleAddIngredients(e) {
        e.preventDefault();
        let { selectedIngredient, ingredientID, ingredientName, quantity, sellPrice} = this.state;
        selectedIngredient.push({
            "id": ingredientID,
            "name": ingredientName,
            "quantityPresent": quantity,
            "sellPrice": sellPrice
        });
        this.setState({selectedIngredient: selectedIngredient});
    }

    componentDidMount() {
        ProductService.getIngredients().then(
            response => {
                this.setState({
                    ingredientsPresent: response
                });
                if(this.state.ingredientName === ""){
                    this.setState({
                        ingredientID: response[0].id,
                        ingredientName: response[0].name
                    })
                }
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    Add Products
                </header>
                <Form
                    onSubmit={this.handleRegister}
                    ref={c => {
                        this.form = c;
                    }}
                >
                    <div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChangeName}
                            />
                        </div>

                        <label className="">
                            Pick Ingredients:
                        </label>
                        <div className="form-group row">
                            <div className="col-sm-1">
                                {this.state.ingredientsPresent.length && (
                                    <select className="form-control-sm" onChange={this.handleListChange}>
                                        {this.state.ingredientsPresent.map(({ id, name}) => (
                                            <option key ={id} value = {[id,name]}>
                                                {name}
                                            </option>
                                        ))}
                                    </select>
                                )}

                            </div>
                            <div className="col-sm-1">
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="quantity"
                                    value={this.state.quantity}
                                    onChange={this.onChangeQuantity}
                                />
                            </div>
                            <div className="col-sm-1">
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="sellPrice"
                                    value={this.state.sellPrice}
                                    onChange={this.onChangeSellPrice}
                                />
                            </div>
                            <div className="col-sm-2">
                                <button className="form-control" onClick={this.handleAddIngredients}>Add Ingredients</button>
                            </div>
                            <div className="col-sm-2">
                                {!this.state.selectedIngredient.length ? (
                                    <div>
                                        No ingredients selected
                                    </div>
                                    ) :  (
                                    <table className="table table-sm table-striped">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Quantity</th>
                                                <th>Selling Price</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.selectedIngredient.map((item, i) => {
                                                return [
                                                    <tr key={i}>
                                                        <td>{item.id}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.quantityPresent}</td>
                                                        <td>{item.sellPrice}</td>
                                                    </tr>,
                                                ];
                                            })}
                                            </tbody>
                                    </table>
                                )}
                            </div>

                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary btn-block">Add</button>
                        </div>
                    </div>

                    {this.state.message && (
                        <div className="form-group">
                            <div
                                className={
                                    this.state.successful
                                        ? "alert alert-success"
                                        : "alert alert-danger"
                                }
                                role="alert"
                            >
                                {this.state.message}
                            </div>
                        </div>
                    )}
                    <CheckButton
                        style={{ display: "none" }}
                        ref={c => {
                            this.checkBtn = c;
                        }}
                    />
                </Form>
            </div>
        );
    }
}