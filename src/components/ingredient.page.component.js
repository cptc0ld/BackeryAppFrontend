import React, {Component} from "react";
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import ProductService from "../services/product.service";
import AuthService from "../services/auth.service";
import Stack from "react-bootstrap/cjs/Stack";

export default class IngredientPageComponent extends Component {
    constructor(props) {
        super(props);
        this.editProductClicked = this.editProductClicked.bind(this)
        this.onNameChanged = this.onNameChanged.bind(this)
        this.onQuantityIncrease = this.onQuantityIncrease.bind(this)
        this.onQuantityDecrease = this.onQuantityDecrease.bind(this)
        this.onCostPriceChanged = this.onCostPriceChanged.bind(this)
        this.editProductClicked = this.editProductClicked.bind(this)
        this.updateProject = this.updateProject.bind(this)
        this.onFileChanged = this.onFileChanged.bind(this)
        this.deleteProduct = this.deleteProduct.bind(this)
        this.dontUpdate = this.dontUpdate.bind(this)

        this.status = {
            view: 'view',
            edit: 'edit',
            delete: 'delete'
        }

        this.id = ""
        this.state = {
            product: {},
            editProduct: {},
            currentUser: null,
            isAdmin: false,
            status: this.status.view,
            editName: "",
            editPrice: "",
            editCostPrice: "",
            editImage: null
        }
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
        const editProduct = {...this.state.editProduct, name: e.target.value};
        this.setState({
            editProduct: editProduct
        });
    }

    onQuantityIncrease() {
        const editProduct = {...this.state.editProduct, quantity: this.state.editProduct.quantity + 1};
        this.setState({
            editProduct: editProduct
        });
    }

    onQuantityDecrease(e) {
        const editProduct = {...this.state.editProduct, quantity: this.state.editProduct.quantity - 1};
        this.setState({
            editProduct: editProduct
        });
    }

    onCostPriceChanged(e) {
        const editProduct = {...this.state.editProduct, costPrice: e.target.value};
        this.setState({
            editProduct: editProduct
        });
    }

    onFileChanged(e) {
        const editProduct = {...this.state.editProduct, image: e.target.files[0]};
        this.setState({
            editProduct: editProduct
        });
    }

    updateProject() {
        let {name, costPrice, image, quantity} = this.state.editProduct
        console.log(this.state.editProduct)
        ProductService.editIngredient(this.id, name, quantity, costPrice, image).then(r => {
                this.setState({
                    status: this.status.view
                })
                this.getProductDetails()
            }
        )
    }

    dontUpdate(){
        this.setState({
            status: this.status.view
        })
    }

    getProductDetails() {
        ProductService.getIngredientById(this.id).then(
            response => {
                this.setState({
                    product: response,
                    editProduct: response
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
        ProductService.deleteIngredient(this.id).then(
            response => {
                this.props.history.push(`/ingredients`);
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
        let {product, isAdmin, editProduct} = this.state
        return (
            <Container>
                <Row className="text-center p-5 bg-dark rounded-2">
                    <h1 className="text-light">Ingredients</h1>
                </Row>
                <Row className="bg-light mb-5 mt-5 p-5">
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
                                            <b>Quantity: {product.quantity}</b>
                                            <b>Cost Price: {product.costPrice}</b>
                                            {isAdmin && (
                                                <Stack className="mt-2" direction="horizontal" gap={3}>
                                                    <Button variant="primary" onClick={this.editProductClicked}>Edit
                                                        ingredient</Button>
                                                    <Button variant="danger" onClick={this.deleteProduct}>Delete
                                                        ingredient</Button>
                                                </Stack>
                                            )}
                                        </Stack>
                                    )
                                case this.status.edit:
                                    return (
                                        <Stack gap={3}>
                                            <b>Name: {product.name}</b>
                                            <b>Edit quantity:{'    '}
                                                <Button variant="success" size="sm"
                                                        onClick={this.onQuantityIncrease}> + </Button>{'    '}{editProduct.quantity}{'    '}
                                                <Button variant="danger" size="sm"
                                                        onClick={this.onQuantityDecrease}> - </Button>
                                            </b>
                                            <b>Edit cost price: (leave blank to not update) <input type="text"
                                                                                                   onChange={this.onCostPriceChanged}/></b>
                                            <b>Edit image: <input type="file" onChange={this.onFileChanged}/></b>
                                            {isAdmin && (
                                                <Stack className="mt-2" direction="horizontal" gap={3}>
                                                    <Button variant="success" onClick={this.updateProject}>Update
                                                        ingredient</Button>
                                                    <Button variant="danger" onClick={this.dontUpdate}>Go back</Button>
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