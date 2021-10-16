import {Component} from "react";
import ProductService from "../services/product.service";
import {Col, Container, Modal} from 'react-bootstrap';
import AddProductFormComponent from "./add.product.form.component";
import UploadImageComponent from "./upload.image.component";

export default class FormAddProduct extends Component {

    constructor(props) {
        super(props);
        this.handleHide = this.handleHide.bind(this)
        this.handleFormSuccess = this.handleFormSuccess.bind(this)

        this.state = {
            name: "",
            successful: false,
            message: "",
            ingredientsPresent: [],
            addedProduct: null
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

    handleFormSuccess(e) {
        this.setState({
            successful: true,
            addedProduct: e
        })
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        {!this.state.successful ? (
                            <AddProductFormComponent ingredientsPresent={this.state.ingredientsPresent}
                                                     onSuccess={this.handleFormSuccess}/>
                        ) : (
                            <UploadImageComponent product={this.state.addedProduct}/>
                        )}
                    </Container>
                </Modal.Body>
            </Modal>
        )
    }
}
