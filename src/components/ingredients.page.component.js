import React, {Component} from "react";

import ProductService from "../services/product.service";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import ProductCardComponent from "./product.card.component";

export default class IngredientsPageComponent extends Component {
    constructor(props) {
        super(props);
        this.handleIngredientClick = this.handleIngredientClick.bind(this)
        this.state = {
            error: "",
            ingredients: []
        };
    }

    handleIngredientClick(e) {
        this.props.history.push(`/ingredient/${e}`);
        window.location.reload();
    }

    componentDidMount() {
        ProductService.getIngredients().then(
            response => {
                this.setState({
                    ingredients: response
                });
            },
            error => {
                this.setState({
                    error:
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
                <Container>
                    <Row>
                        {this.state.ingredients.map((ingredient) => (
                            <Col>
                                <ProductCardComponent product={ingredient} onClick={this.handleIngredientClick}/>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        );
    }
}
