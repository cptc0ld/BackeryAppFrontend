import React, { Component } from "react";
import FormAddProduct from "./add.product.component";
import {Link, Route, Switch} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import {Button} from "react-bootstrap";

export default class BoardUser extends Component {

    constructor(props) {
        super(props);
        this.handleAddProductShow = this.handleAddProductShow.bind(this)
        this.handleAddProductHide = this.handleAddProductHide.bind(this)
        this.state = {
            "showAddProduct": false
        }
    }

    handleAddProductShow() {
        if(!this.state.showAddProduct){
            this.setState({
                "showAddProduct": true
            })
        }
    }
    handleAddProductHide() {
        if(this.state.showAddProduct){
            this.setState({
                "showAddProduct": false
            })
        }
    }
    render() {
        return (
            <div>
                <Button variant="primary" onClick={this.handleAddProductShow}>
                    Add Product
                </Button>
                <FormAddProduct show={this.state.showAddProduct} onHide={this.handleAddProductHide}/>
            </div>

        );
    }
}