import React, {Component} from "react";
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import ProductService from "../services/product.service";

export default class ProductPageComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            product: {}
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params
        ProductService.getProductById(id).then(
            response => {
                this.setState({
                    product: response
                });
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
        let {product} = this.state
        return (
            <Container>
                <Row>
                    <Col>{product.name}</Col>
                </Row>
                <Row>
                    <Image src={product.image}/>
                </Row>
            </Container>
        );
    }
}