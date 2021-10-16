import React, {Component} from "react";
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import ProductService from "../services/product.service";
import AuthService from "../services/auth.service";
import Stack from "react-bootstrap/cjs/Stack";
import OrderService from "../services/order.service"

export default class ProductPageComponent extends Component {
    constructor(props) {
        super(props);
        this.editProductClicked = this.editProductClicked.bind(this)
        this.onNameChanged = this.onNameChanged.bind(this)
        this.onPriceChanged = this.onPriceChanged.bind(this)
        this.onDescChanged = this.onDescChanged.bind(this)
        this.editProductClicked = this.editProductClicked.bind(this)
        this.updateProject = this.updateProject.bind(this)
        this.onFileChanged = this.onFileChanged.bind(this)
        this.deleteProduct = this.deleteProduct.bind(this)
        this.buyProduct = this.buyProduct.bind(this)

        this.status = {
            view: 'view',
            edit: 'edit',
            delete: 'delete'
        }

        this.id = ""
        this.state = {
            product: {},
            currentUser: null,
            isAdmin: false,
            status: this.status.view,
            editName: "",
            editPrice: "",
            editDesc: "",
            editImage: null
        }
    }

    buyProduct() {
        let {product} = this.state
        OrderService.createOrder(product.id)
            .then(r => {
                console.log("ordered")
            })
    }

    editProductClicked() {
        this.setState({
            status: this.status.edit
        })
    }

    componentDidMount() {
        this.id = this.props.match.params.id
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                isAdmin: user.is_admin
            });
        }

        this.getProductDetails()
    }

    onNameChanged(e) {
        this.setState({
            editName: e.target.value
        });
    }

    onPriceChanged(e) {
        this.setState({
            editPrice: e.target.value
        });
    }

    onDescChanged(e) {
        this.setState({
            editDesc: e.target.value
        });
    }

    onFileChanged(e) {
        this.setState({
            editImage: e.target.files[0]
        });
    }

    updateProject() {
        let {editName, editPrice, editDesc, editImage} = this.state
        ProductService.editProduct(this.id, editName, editImage).then(r => {
                this.setState({
                    status: this.status.view
                })
                this.getProductDetails()
            }
        )
    }

    getProductDetails() {
        ProductService.getProductById(this.id).then(
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

    deleteProduct() {
        ProductService.deleteProduct(this.id).then(
            response => {
                this.props.history.push(`/home`);
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
        let {product, isAdmin} = this.state
        return (
            <Container className='p-4 bg-light border'>
                <Row>
                    <Col md={{span: 4, offset: 1}}>
                        <Image thumbnail src={product.image}/>
                    </Col>
                    <Col>
                        {(() => {
                            switch (this.state.status) {
                                case this.status.view:
                                    return (
                                        <Stack gap={3}>
                                            <b>Name: {product.name}</b>
                                            <b>Price: {product.price}</b>
                                            <b>Description: {product.desc}</b>
                                            <Button variant="success" onClick={this.buyProduct}>
                                                Buy Now</Button>
                                            {isAdmin && (
                                                <Stack className="mt-2" direction="horizontal" gap={3}>
                                                    <Button variant="primary" onClick={this.editProductClicked}>Edit
                                                        product</Button>
                                                    <Button variant="danger" onClick={this.deleteProduct}>Delete
                                                        product</Button>
                                                </Stack>
                                            )}
                                        </Stack>
                                    )
                                case this.status.edit:
                                    return (
                                        <Stack gap={3}>
                                            <b>Edit Name: <input type="text" onChange={this.onNameChanged}/></b>
                                            <b>Edit Price: <input type="text" onChange={this.onPriceChanged}/></b>
                                            <Stack><b>Edit Description: </b><input type="textarea"
                                                                                   onChange={this.onDescChanged}/></Stack>
                                            <b>Edit Image: <input type="file" onChange={this.onFileChanged}/></b>
                                            {isAdmin && (
                                                <Stack className="mt-2" direction="horizontal" gap={3}>
                                                    <Button variant="success" onClick={this.updateProject}>Update
                                                        product</Button>
                                                </Stack>
                                            )}
                                        </Stack>

                                    )
                                case this.status.delete:
                                    return (
                                        <div>You are a Manager.</div>
                                    )
                                default:
                                    return (
                                        <div>Nothing to show</div>
                                    )
                            }
                        })()}
                    </Col>
                </Row>
            </Container>
        )
            ;
    }
}