import React, {Component} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import '../static/main.css'
import '../static/product.css'

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

    getDescString(desc) {
        if (desc.length > 40) {
            return (desc.substring(0, 40) + "...")
        } else {
            return desc
        }
    }

    render() {
        const {product} = this.props
        return (
            <Card className="pointer product-card" onClick={this.onTrigger}>
                <Card.Img className="product-card-image" variant="top" src={product.image}/>
                <Card.Body>
                    <Container className="product-card-body">
                        <Card.Title><u>{product.name}</u></Card.Title>
                        <Card.Text>
                            <p> {this.getDescString(product.desc)}</p>
                            <p> Price: {product.sellPrice}/- </p>
                        </Card.Text>
                    </Container>
                </Card.Body>
                <Card.Footer className="text-muted text-center">Click for more details</Card.Footer>
            </Card>
        );
    }
}