import {Component} from "react";
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import '../static/order.css';
import Stack from "react-bootstrap/cjs/Stack";
import OrderService from '../services/order.service'

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
                console.log(r)
                this.setState({
                    order: r,
                    successful: true
                })
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
            <Container>
                {successful && (
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
                )}
            </Container>
        )
    }
}
