import {Component} from "react";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import ProductService from "../services/product.service";
import {Button, Col, Container, Modal, Row, Table} from 'react-bootstrap';

export default class FormAddProduct extends Component {

    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.handleAddIngredients = this.handleAddIngredients.bind(this);
        this.handleListChange = this.handleListChange.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this)
        this.onChangeSellPrice = this.onChangeSellPrice.bind(this)
        this.handleHide = this.handleHide.bind(this)
        this.removeIngredient = this.removeIngredient.bind(this)
        this.state = {
            name:"",
            successful: false,
            message: "",
            ingredientsPresent: [],
            selectedIngredient: [],
            ingredientID: "",
            ingredientName: "",
            quantity : "",
            sellPrice: ""
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeQuantity(e) {
        this.setState({
            quantity: e.target.value
        });
    }

    onChangeSellPrice(e) {
        this.setState({
            sellPrice: e.target.value
        });
    }

    handleRegister(e) {
        e.preventDefault();
        let list_of_ingredients = [];
        this.state.selectedIngredient.forEach(ingredient =>{
            list_of_ingredients.push(ingredient.id)
        })
        ProductService.addProduct(
            this.state.name,
            list_of_ingredients
        )
            .then(
                response => {
                    this.setState({
                        message: response,
                        successful: true
                    });
                },
                error => {
                    console.log(JSON.stringify(error))
                    const resMessage = error.toString();

                    this.setState({
                        message: resMessage,
                        successful: false
                    });
                }
            )
    }

    handleListChange(e) {
        const data = e.target.value.split(",")
        console.log(data)
        this.setState({
            ingredientID: data[0],
            ingredientName: data[1]
        });
    }

    handleAddIngredients(e) {
        e.preventDefault();
        let { selectedIngredient, ingredientID, ingredientName, quantity, sellPrice} = this.state;
        selectedIngredient.push({
            "id": ingredientID,
            "name": ingredientName,
            "quantityPresent": quantity,
            "sellPrice": sellPrice
        });
        this.setState({selectedIngredient: selectedIngredient});
    }

    removeIngredient(e) {
        let removeIngredientIndex
        this.state.selectedIngredient.forEach(element => {
            if(element.id === e.target.value){
                removeIngredientIndex = this.state.selectedIngredient.indexOf(element)
            }
        })

        this.state.selectedIngredient.splice(removeIngredientIndex, 1)
        this.setState({selectedIngredient: this.state.selectedIngredient});
    }

    componentDidMount() {
        ProductService.getIngredients().then(
            response => {
                this.setState({
                    ingredientsPresent: response
                });
                if(this.state.ingredientName === ""){
                    this.setState({
                        ingredientID: response[0].id,
                        ingredientName: response[0].name
                    })
                }
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

    handleHide(){
        this.props.onHide()
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                            <Form
                                onSubmit={this.handleRegister}
                                ref={c => {
                                    this.form = c;
                                }}
                            >
                                <Container>
                                    <Row className="form-group">
                                        <Col htmlFor="name">Name</Col>
                                        <Col><Input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.onChangeName}
                                        /></Col>
                                    </Row>

                                    <Row>
                                        <Col className="">
                                            Pick Ingredients:
                                        </Col>
                                        <Col className="">
                                            {this.state.ingredientsPresent.length && (
                                                <select className="form-control-sm" onChange={this.handleListChange}>
                                                    {this.state.ingredientsPresent.map(({ id, name}) => (
                                                        <option key ={id} value = {[id,name]}>
                                                            {name}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}

                                        </Col>
                                        <Col className="">
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="quantity"
                                                value={this.state.quantity}
                                                onChange={this.onChangeQuantity}
                                            />
                                        </Col>
                                        <Col className="">
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="sellPrice"
                                                value={this.state.sellPrice}
                                                onChange={this.onChangeSellPrice}
                                            />
                                        </Col>
                                        <Col className="">
                                            <Button form-control onClick={this.handleAddIngredients}>Add Ingredients</Button>
                                        </Col>
                                    </Row>
                                    <Row className="">
                                        {!this.state.selectedIngredient.length ? (
                                            <div>
                                                No ingredients selected
                                            </div>
                                        ) :  (
                                            <Table table striped>
                                                <thead>
                                                <tr>
                                                    <th>Action</th>
                                                    <th>Name</th>
                                                    <th>Quantity</th>
                                                    <th>Selling Price</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.selectedIngredient.map((item, i) => {
                                                    return [
                                                        <tr key={i}>
                                                            <td>
                                                                <Button value={item.id} onClick={this.removeIngredient}>X</Button>
                                                            </td>
                                                            <td>{item.name}</td>
                                                            <td>{item.quantityPresent}</td>
                                                            <td>{item.sellPrice}</td>
                                                        </tr>,
                                                    ];
                                                })}
                                                </tbody>
                                            </Table>
                                        )}
                                    </Row>

                                    <Row className="form-group">
                                        <button className="btn btn-primary btn-block">Add</button>
                                    </Row>
                                </Container>

                                {this.state.message && (
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
                                    style={{ display: "none" }}
                                    ref={c => {
                                        this.checkBtn = c;
                                    }}
                                />
                            </Form>
                    </Container>
                </Modal.Body>
            </Modal>
        )
    }
}
