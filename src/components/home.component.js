import React, {Component} from "react";

import UserService from "../services/user.service";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import ProductCardComponent from "./product.card.component";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.handleProductClick = this.handleProductClick.bind(this)
        this.state = {
            error: "",
            products: []
        };
    }

    handleProductClick(e) {
        this.props.history.push(`/product/${e}`);
        window.location.reload();
    }

    componentDidMount() {
        UserService.getPublicContent().then(
            response => {
                this.setState({
                    products: response
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
                        {this.state.products.map((product) => (
                            <Col>
                                <ProductCardComponent product={product} onClick={this.handleProductClick}/>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        );
    }
}
