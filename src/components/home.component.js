import React, {Component} from "react";

import UserService from "../services/user.service";
import {Col, Container, Row} from "react-bootstrap";
import ProductCardComponent from "./product.card.component";
import '../static/main.css'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.handleProductClick = this.handleProductClick.bind(this)
        this.openStore = this.openStore.bind(this)
        this.state = {
            error: "",
            products: [],
        };
    }

    handleProductClick(e) {
        this.props.history.push(`/product/${e}`);
        window.location.reload();
    }

    componentDidMount() {
        UserService.getPublicContent().then(
            response => {
                this.setState({
                    products: response
                });
            },
            error => {
                if(error.message === "401"){
                    this.props.history.push('/login')
                    window.location.reload()
                }else{
                    this.setState({
                        error:
                            (error.response && error.response.data) ||
                            error.message ||
                            error.toString()
                    });
                }
            }
        );
    }

    openStore() {
        this.props.history.push('/product')
        window.location.reload()
    }

    render() {
        return (
            <Container>
                <Row className="text-center p-5 bg-dark rounded-2">
                    <h1 className="text-light">Welcome to the store</h1>
                </Row>
                <Row className="bg-light mt-2 p-5">
                    <Col>
                        <h5><u className="pointer p-2 rounded-3" onClick={this.openStore}> Check out the store </u>
                        </h5>
                    </Col>
                    <Row className="justify-content-center">
                        {this.state.products.map((product, index) => {
                                console.log(index)
                                if (index < 4) {
                                    console.log(index)
                                    return (
                                        <Col>
                                            <ProductCardComponent product={product}
                                                                  onClick={this.handleProductClick}/>
                                        </Col>
                                    )
                                }
                            }
                        )
                        }
                    </Row>
                </Row>
            </Container>
        );
    }
}
