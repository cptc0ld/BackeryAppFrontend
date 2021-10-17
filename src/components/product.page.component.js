import React, {Component} from "react";
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import ProductService from "../services/product.service";
import AuthService from "../services/auth.service";
import Stack from "react-bootstrap/cjs/Stack";
import OrderService from "../services/order.service"
import IngredientCardComponent from "./ingredient.card.component";

export default class ProductPageComponent extends Component {
    constructor(props) {
        super(props);
        this.editProductClicked = this.editProductClicked.bind(this)
        this.onPriceChanged = this.onPriceChanged.bind(this)
        this.onDescChanged = this.onDescChanged.bind(this)
        this.editProductClicked = this.editProductClicked.bind(this)
        this.updateProject = this.updateProject.bind(this)
        this.onFileChanged = this.onFileChanged.bind(this)
        this.deleteProduct = this.deleteProduct.bind(this)
        this.buyProduct = this.buyProduct.bind(this)
        this.dontUpdate = this.dontUpdate.bind(this)
        this.getIngredientsDetail = this.getIngredientsDetail.bind(this)
        this.handleIngredientClick = this.handleIngredientClick.bind(this)
        this.status = {
            view: 'view',
            edit: 'edit',
            delete: 'delete'
        }

        this.id = ""
        this.state = {
            product: {},
            productLoaded: false,
            editProduct: {},
            currentUser: null,
            isAdmin: false,
            status: this.status.view,
            ingredientPresent: [],
            ingredientIds: [],
            ingredientLoaded: false
        }
    }

    buyProduct() {
        let {product} = this.state
        OrderService.createOrder(product.id)
            .then(r => {
                console.log(r)
                this.props.history.push('/order/bill/' + r.id)
                window.location.reload()
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

    getIngredientsDetail() {
        let {product, productLoaded, ingredientIds} = this.state
        let ingredientPresent = [];
        ingredientIds.map((i, index) => {
                ProductService.getIngredientById(i.ingredient).then(
                    response => {
                        ingredientPresent.push(response)

                        if(index === ingredientIds.length-1){
                            this.setState({
                                ingredientPresent
                            })
                        }
                    },
                    error => {
                        // this.props.history.push('/page_not_found')
                        // window.location.reload()
                    }
                )
            }
        )
    }

    onPriceChanged(e) {
        const editProduct = {...this.state.editProduct, sellPrice: e.target.value};
        this.setState({
            editProduct: editProduct
        });
    }

    onDescChanged(e) {
        const editProduct = {...this.state.editProduct, desc: e.target.value};
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
        let {name, sellPrice, desc, image} = this.state.editProduct
        console.log(this.state.editProduct)
        ProductService.editProduct(this.id, name, sellPrice, desc, image).then(r => {
                this.setState({
                    status: this.status.view
                })
                this.getProductDetails()
            }
        )
    }

    dontUpdate() {
        this.setState({
            status: this.status.view
        })
    }

    getProductDetails() {
        ProductService.getProductById(this.id).then(
            response => {
                this.setState({
                    product: response.product,
                    editProduct: response.product,
                    productLoaded: true,
                    ingredientIds: response.ingredients
                });
                if (this.state.isAdmin) {
                    console.log(this.state.isAdmin)
                    this.getIngredientsDetail()
                }
            },
            error => {
                // this.props.history.push('/page_not_found')
                // window.location.reload()
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

    handleIngredientClick(e) {
        this.props.history.push(`/ingredient/${e}`);
        window.location.reload();
    }

    render() {
        let {product, isAdmin, ingredientLoaded, ingredientPresent} = this.state
        return (
            <Container>
                <Row className="text-center p-5 bg-dark rounded-2">
                    <h1 className="text-light">Products</h1>
                </Row>
                <Row className='bg-light mb-5 mt-5 p-5'>
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
                                                <b>Price: {product.sellPrice}</b>
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
                                                <b>Name: {product.name}</b>
                                                <b>Edit Price: (leave blank to not update) <input type="text"
                                                                                                  onChange={this.onPriceChanged}/></b>
                                                <Stack><b>Edit Description: (leave blank to not update) </b><input
                                                    type="textarea"
                                                    onChange={this.onDescChanged}/></Stack>
                                                <b>Edit Image: <input type="file" onChange={this.onFileChanged}/></b>
                                                {isAdmin && (
                                                    <Stack className="mt-2" direction="horizontal" gap={3}>
                                                        <Button variant="success" onClick={this.updateProject}>Update
                                                            product</Button>
                                                        <Button variant="danger" onClick={this.dontUpdate}>Go
                                                            back</Button>
                                                    </Stack>
                                                )}
                                            </Stack>

                                        )
                                    case this.status.delete:
                                        return (
                                            <div/>
                                        )
                                    default:
                                        return (
                                            <div>Nothing to show</div>
                                        )
                                }
                            })()}
                        </Col>
                    </Row>
                        <Row className="m-5">
                        <Row className="mt-5">
                            <h4><u>Ingredients present</u></h4>
                        </Row>
                        <Row className="mt-3">
                            {this.state.ingredientPresent.map(ingredient => (
                                <Col>
                                    <IngredientCardComponent ingredient={ingredient} onClick={this.handleIngredientClick}/>
                                </Col>
                            ))}
                        </Row>
                    </Row>
                </Row>
            </Container>
        );
    }
}