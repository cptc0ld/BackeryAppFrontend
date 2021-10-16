import React, {Component} from "react";
import {Card, Container} from "react-bootstrap";
import '../static/main.css'
import '../static/product.css'

export default class IngredientCardComponent extends Component {
    constructor(props) {
        super(props);
        this.onTrigger = this.onTrigger.bind(this)
    }

    onTrigger = (event) => {
        const {ingredient, onClick} = this.props
        onClick(ingredient.id);
        event.preventDefault();
    }

    render() {
        const {ingredient} = this.props
        return (
            <Card className="pointer product-card" onClick={this.onTrigger}>
                <Card.Img className="product-card-image" variant="top" src={ingredient.image}/>
                <Card.Body>
                    <Container className="product-card-body">
                        <Card.Title><u>{ingredient.name}</u></Card.Title>
                        <Card.Text>
                            <p> Price: {ingredient.costPrice}/- </p>
                            <p> Quantity present: {ingredient.quantity}/- </p>
                        </Card.Text>
                    </Container>
                </Card.Body>
                <Card.Footer className="text-muted text-center">Click for more details</Card.Footer>
            </Card>
        );
    }
}