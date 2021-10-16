import React, {Component} from "react";
import {Button, Card, Col, Container, Image, Row, Table} from "react-bootstrap";
import ProductService from "../services/product.service";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";

export default class AddProductFormComponent extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this)
        this.removeIngredient = this.removeIngredient.bind(this)
        this.onChangeName = this.onChangeName.bind(this);
        this.handleAddIngredients = this.handleAddIngredients.bind(this);
        this.handleListChange = this.handleListChange.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this)
        this.onChangeSellPrice = this.onChangeSellPrice.bind(this)
        this.state = {
            name: "",
            successful: false,
            message: "",
            selectedIngredient: [],
            quantity: "",
            sellPrice: "",
            ingredientID: "",
            ingredientName: "",
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

    handleAddIngredients(e) {
        e.preventDefault();
        let {selectedIngredient, ingredientID, ingredientName, quantity, sellPrice} = this.state;
        selectedIngredient.push({
            "id": ingredientID,
            "name": ingredientName,
            "quantityPresent": quantity,
            "sellPrice": sellPrice
        });
        this.setState({selectedIngredient: selectedIngredient});
    }

    handleListChange(e) {
        const data = e.target.value.split(",")
        this.setState({
            ingredientID: data[0],
            ingredientName: data[1]
        });
    }

    removeIngredient(e) {
        let removeIngredientIndex
        this.state.selectedIngredient.forEach(element => {
            if (element.id === e.target.value) {
                removeIngredientIndex = this.state.selectedIngredient.indexOf(element)
            }
        })

        this.state.selectedIngredient.splice(removeIngredientIndex, 1)
        this.setState({selectedIngredient: this.state.selectedIngredient});
    }

    handleRegister(e) {
        e.preventDefault();
        let list_of_ingredients = [];
        this.state.selectedIngredient.forEach(ingredient => {
            let ingredientObj = {}
            ingredientObj['ingredient'] = ingredient.id
            ingredientObj['quantity'] = ingredient.quantityPresent
            list_of_ingredients.push(ingredientObj)
        })
        ProductService.addProduct(
            this.state.name,
            list_of_ingredients
        )
            .then(
                response => {
                    this.setState({
                        message: response.product.name + " Added",
                        successful: true
                    });
                    this.props.onSuccess(response.product)
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

    componentDidMount() {

    }

    render() {
        let {ingredientsPresent} = this.props
        console.log(ingredientsPresent)
        if (this.state.ingredientName === "" && ingredientsPresent !== undefined) {
            this.setState({
                ingredientID: ingredientsPresent[0].id,
                ingredientName: ingredientsPresent[0].name
            })
        }
        return (
            <Form
                onSubmit={this.handleRegister}
                ref={c => {
                    this.form = c;
                }}
            >
                <Container>
                    <Row className="form-group">
                        <Col htmlFor="name">Name</Col>
                        <Col><Input
                            type="text"
                            className="form-control"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        /></Col>
                    </Row>

                    <Row>
                        <Col className="">
                            Pick Ingredients:
                        </Col>
                        <Col className="">
                            {ingredientsPresent.length && (
                                <select className="form-control-sm" onChange={this.handleListChange}>
                                    {ingredientsPresent.map(({id, name}) => (
                                        <option key={id} value={[id, name]}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            )}

                        </Col>
                        <Col className="">
                            <Input
                                type="text"
                                className="form-control"
                                name="quantity"
                                value={this.state.quantity}
                                onChange={this.onChangeQuantity}
                            />
                        </Col>
                        <Col className="">
                            <Input
                                type="text"
                                className="form-control"
                                name="sellPrice"
                                value={this.state.sellPrice}
                                onChange={this.onChangeSellPrice}
                            />
                        </Col>
                        <Col className="">
                            <Button form-control onClick={this.handleAddIngredients}>Add Ingredients</Button>
                        </Col>
                    </Row>
                    <Row className="">
                        {!this.state.selectedIngredient.length ? (
                            <div>
                                No ingredients selected
                            </div>
                        ) : (
                            <Table table striped>
                                <thead>
                                <tr>
                                    <th>Action</th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Selling Price</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.selectedIngredient.map((item, i) => {
                                    return [
                                        <tr key={i}>
                                            <td>
                                                <Button value={item.id} onClick={this.removeIngredient}>X</Button>
                                            </td>
                                            <td>{item.name}</td>
                                            <td>{item.quantityPresent}</td>
                                            <td>{item.sellPrice}</td>
                                        </tr>,
                                    ];
                                })}
                                </tbody>
                            </Table>
                        )}
                    </Row>

                    <Row className="form-group">
                        <button className="btn btn-primary btn-block">Add and Continue</button>
                    </Row>
                </Container>

                {!this.state.successful && this.state.message && (
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
                    style={{display: "none"}}
                    ref={c => {
                        this.checkBtn = c;
                    }}
                />
            </Form>
        );
    }
}