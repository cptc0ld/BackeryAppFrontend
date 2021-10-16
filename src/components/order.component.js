import {Component} from "react";
import {Card, Container, Image} from "react-bootstrap";
import OrderService from "../services/order.service";
import '../static/order.css';

export default class OrderComponent extends Component {

    constructor(props) {
        super(props);

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
            })
    }


    render() {
        let {orders} = this.state
        return (
            <Container>
                {orders.map(order => (
                    <Card>
                        <Card.Header>
                            {order.product.name}
                        </Card.Header>
                        <Card.Body>
                            <Image className="product-image" src={order.product.image}/>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
        )
    }
}
