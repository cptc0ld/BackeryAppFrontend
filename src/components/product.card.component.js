import React, { Component } from "react";
import AuthService from "../services/auth.service";
import {Button, Card, Col} from "react-bootstrap";

export default class ProductCardComponent extends Component {
    constructor(props) {
        super(props);
        this.onTrigger = this.onTrigger.bind(this)
    }

    onTrigger = (event) => {
        const {product, onClick} = this.props
        onClick(product.id);
        event.preventDefault();
    }
    render() {
        const {product, onClick} = this.props
        return (
                <Card style={{width: '18rem'}}>
                    <Card.Img variant="top" src={product.image}/>
                    <Card.Body>
                        <Card.Title>{product.id}</Card.Title>
                        <Card.Text>
                            {product.name}
                        </Card.Text>
                        <Button variant="primary" onClick={this.onTrigger}>Buy Now</Button>
                    </Card.Body>
                </Card>
        );
    }
}