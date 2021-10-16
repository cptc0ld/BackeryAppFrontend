import React, {Component} from "react";
import {Button, Card, Col, Container, Image, Row, Table} from "react-bootstrap";
import ProductService from "../services/product.service";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";

export default class UploadImageComponent extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this)
        this.state = {
            successful: false,
            message: "",
            file: null

        }
    }

    handleRegister() {
        let {product} = this.props
        ProductService.editProduct(product.id, product.name, this.state.file)
    }

    fileChangedHandler = (event) => {
        this.setState({
            file : event.target.files[0]
        })
    }

    componentDidMount() {

    }


    render() {
        return (
            <Form
                onSubmit={this.handleRegister}
                ref={c => {
                    this.form = c;
                }}
            >
                <Container>
                    <Row className="form-group">
                        <Col htmlFor="name">Image</Col>
                        <Col>
                            <input type="file" onChange={this.fileChangedHandler}/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <button className="btn btn-primary btn-block">Add and Continue</button>
                    </Row>
                </Container>

                {!this.state.successful && this.state.message && (
                    <div className="form-group">
                        <div
                            className={
                                this.state.successful
                                    ? "alert alert-success"
                                    : "alert alert-danger"
                            }
                            role="alert"
                        >
                            {this.state.message}
                        </div>
                    </div>
                )}
                <CheckButton
                    style={{display: "none"}}
                    ref={c => {
                        this.checkBtn = c;
                    }}
                />
            </Form>
        );
    }
}