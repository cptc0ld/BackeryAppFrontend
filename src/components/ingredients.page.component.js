import React, {Component} from "react";

import ProductService from "../services/product.service";
import {Col, Container, Row} from "react-bootstrap";
import IngredientCardComponent from "./ingredient.card.component";

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
                                <IngredientCardComponent ingredient={ingredient} onClick={this.handleIngredientClick}/>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        );
    }
}
