import {Component} from "react";
import ProductService from "../services/product.service";
import {Col, Container, Modal} from 'react-bootstrap';
import AddProductFormComponent from "./add.product.form.component";
import UploadImageComponent from "./upload.image.component";
import AddIngredientFormComponent from "./add.ingredient.form.component";

export default class FormAddIngredient extends Component {

    constructor(props) {
        super(props);
        this.handleHide = this.handleHide.bind(this)
        this.handleFormSuccess = this.handleFormSuccess.bind(this)

        this.state = {
            name: "",
            successful: false,
            message: "",
            addedIngredient: null
        };
    }

    componentDidMount() {
    }

    handleHide() {
        this.props.onHide()
    }

    handleFormSuccess(e) {
        this.setState({
            successful: true,
            addedIngredient: e
        })
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Ingredient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddIngredientFormComponent onSuccess={this.handleFormSuccess}/>
                </Modal.Body>
            </Modal>
        )
    }
}
