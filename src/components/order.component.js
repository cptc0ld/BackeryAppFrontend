import {Component} from "react";
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import OrderService from "../services/order.service";
import '../static/order.css';
import Stack from "react-bootstrap/cjs/Stack";

export default class OrderComponent extends Component {

    constructor(props) {
        super(props);
        this.getBill = this.getBill.bind(this)
        this.state = {
            orders: [],
            successful: false
        };
    }

    componentDidMount() {
        OrderService.getOrderHistory()
            .then(response => {
                this.setState({
                    orders: response,
                    successful: true
                })
                console.log(response)
            })
    }

    getBill(e) {
        this.props.history.push('/order/bill/' + e.target.value)
        window.location.reload()
    }

    getDate(date) {
        const d = new Date(date);
        return d.toDateString()
    }

    render() {
        let {orders} = this.state
        return (
            <Container>
                {orders.map(order => (
                    <Card>
                        <Card.Header>
                            Order date: {this.getDate(order.orderDate)}
                        </Card.Header>
                        <Card.Body>
                            <Container>
                                <Row>
                                    <Col md={2}>
                                        <Image className="product-image" src={order.product.image}/>
                                    </Col>
                                    <Col>
                                        <Stack>
                                            <span><b>Product Name: </b>{order.product.name}</span>
                                            <span><b>Price: </b>{order.product.sellPrice}</span>
                                        </Stack>
                                    </Col>
                                    <Col md={1}>
                                        <Button size="sm" value={order.id} onClick={this.getBill}>Get bill</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
        )
    }
}
