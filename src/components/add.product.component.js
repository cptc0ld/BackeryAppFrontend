import {Component} from "react";
import ProductService from "../services/product.service";
import {Button, Col, Container, Modal, Row, Table} from 'react-bootstrap';
import AddProductFormComponent from "./add.product.form.component";

export default class FormAddProduct extends Component {

    constructor(props) {
        super(props);
        this.handleHide = this.handleHide.bind(this)
        this.state = {
            name: "",
            successful: false,
            message: "",
            ingredientsPresent: [],
            selectedIngredient: [],
            quantity: "",
            sellPrice: ""
        };
    }

    componentDidMount() {
        ProductService.getIngredients().then(
            response => {
                this.setState({
                    ingredientsPresent: response
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

    handleHide() {
        this.props.onHide()
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <AddProductFormComponent ingredientsPresent={this.state.ingredientsPresent}/>
                    </Container>
                </Modal.Body>
            </Modal>
        )
    }
}
