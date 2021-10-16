import React, {Component} from "react";
import {Button, Card, Col, Container, Image, Row, Table} from "react-bootstrap";
import ProductService from "../services/product.service";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";

export default class AddIngredientFormComponent extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeCostPrice = this.onChangeCostPrice.bind(this)
        this.fileChangedHandler = this.fileChangedHandler.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.state = {
            successful: false,
            message: "",
            name: "",
            costPrice: "",
            image: null
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeCostPrice(e) {
        this.setState({
            costPrice: e.target.value
        });
    }

    fileChangedHandler(event) {
        console.log(event.target.files[0])
        this.setState({
            image : event.target.files[0]
        })
    }

    handleRegister(e) {
        let {name, costPrice, image} = this.state
        e.preventDefault();
        console.log(name, costPrice, image)
        ProductService.addIngredients(
            name,
            costPrice,
            image
        )
            .then(
                response => {
                    this.setState({
                        message: response.ingredient.name + " Added",
                        successful: true
                    });
                    this.props.onSuccess(response.ingredient)
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
                        <Col htmlFor="name">Cost Price</Col>
                        <Col className="">
                            <Input
                                type="text"
                                className="form-control"
                                name="quantity"
                                value={this.state.quantity}
                                onChange={this.onChangeCostPrice}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col htmlFor="name">Select Image</Col>
                        <Col className="">
                            <input type="file" onChange={this.fileChangedHandler}/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <button className="btn btn-primary btn-block">Add</button>
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