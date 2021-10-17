import React, {Component} from "react";
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import OrderService from "../services/order.service";
import '../static/order.css';
import Stack from "react-bootstrap/cjs/Stack";

export default class PageNotFoundComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Container>
                <Row className="text-center p-5 bg-dark rounded-2">
                    <h1 className="text-light">Page Not Found</h1>
                </Row>
            </Container>
        )
    }
}
