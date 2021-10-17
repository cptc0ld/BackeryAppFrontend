import React, {Component} from "react";
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import '../static/order.css';
import Stack from "react-bootstrap/cjs/Stack";
import OrderService from '../services/order.service'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

export default class BillComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            order: {},
            successful: false
        };
    }

    componentDidMount() {
        OrderService.getOrderById(this.props.match.params.id).then(r => {
                this.setState({
                    order: r,
                    successful: true
                })
            },
            error => {
                this.props.history.push('/page_not_found')
                window.location.reload()
            }
        )
    }

    getDate(date) {
        const d = new Date(date);
        return d.toDateString()
    }

    render() {
        let {order, successful} = this.state
        return (
            <div className="col-md-12">
                <Row className="text-center p-5 bg-dark rounded-2">
                    <h1 className="text-light">Bill for order# {order.id}</h1>
                </Row>
                <Row className="bg-light mb-5 mt-5 p-5">
                    {order.product && (
                        <div className="card card-container">
                            <img
                                className="p-0"
                                src={order.product.image}
                            />
                            <Row className="m-0">
                                <Row className="mb-5 mr-0">
                                    <a className="p-0 text-end" href={"/product/"+order.product.id} >Go to product page</a>
                                </Row>
                                <Row>
                                    Order date: {this.getDate(order.orderDate)}
                                </Row>
                                <Row>
                                    Product name: {order.product.name}
                                </Row>
                                <Row>
                                    Bill amount: Rs. {order.product.sellPrice} /-
                                </Row>
                            </Row>
                        </div>
                    )}
                </Row>
            </div>
        )
    }
}
