import React, {Component} from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardAdmin from "./components/board-admin.component";
import ProductPageComponent from "./components/product.page.component";
import IngredientsPageComponent from "./components/ingredients.page.component";
import IngredientPageComponent from "./components/ingredient.page.component";
import {Container, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import OrderComponent from "./components/order.component";
import BillComponent from "./components/bill.component";
import ProductsPageComponent from "./components/products.page.component";
import Background from '../src/static/images/background.jpg'
import '../src/static/main.css'
import ProtectedRoute from "./utility/protected.routes";
import AdminProtectedRoute from "./utility/admin.protected.routes";
import PageNotFoundComponent from "./components/page.not.found.component";
class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showAdminBoard: user.is_admin
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const {currentUser, showAdminBoard} = this.state;

        return (
            <div className="main-page">
                <Navbar bg="dark" variant="dark">
                    <Nav className="container-fluid">
                        <Nav>
                            <Nav.Item className="ms-4">
                                <Navbar.Brand as={Link} to="/">221b Baker Street</Navbar.Brand>
                            </Nav.Item>
                            <Nav.Item className="ms-4">
                                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                            </Nav.Item>
                            {showAdminBoard && (
                                <Nav.Item className="ms-4">
                                    <Nav.Link as={Link} to="/admin">Admin Board</Nav.Link>
                                </Nav.Item>
                            )}
                            {currentUser && (
                                <Nav.Item className="ms-4">
                                    <Nav.Link as={Link} to="/profile">User</Nav.Link>
                                </Nav.Item>
                            )}
                        </Nav>
                        {currentUser ? (
                            <Nav>
                                <Nav.Item className="me-4">
                                    <NavDropdown title={currentUser.username} id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to="/profile">
                                            View Profile
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/order">
                                            Orders
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav.Item>
                                <Nav.Item className="me-4">
                                    <a href="/login" className="nav-link" onClick={this.logOut}>
                                        Log Out
                                    </a>
                                </Nav.Item>
                            </Nav>
                        ) : (
                            <Nav>
                                <Nav.Item className="me-4">
                                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="me-4">
                                    <Nav.Link as={Link} to="/register">Sign Up</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        )}
                    </Nav>
                </Navbar>

                <div className="container mt-3">
                    <Switch>
                        <ProtectedRoute exact path={["/", "/home"]} component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <ProtectedRoute exact path="/profile" component={Profile}/>
                        <AdminProtectedRoute path="/admin" component={BoardAdmin}/>
                        <ProtectedRoute exact path={"/product"} component={ProductsPageComponent}/>
                        <ProtectedRoute path="/product/:id" component={ProductPageComponent}/>
                        <AdminProtectedRoute exact path="/ingredients" component={IngredientsPageComponent}/>
                        <AdminProtectedRoute path="/ingredient/:id" component={IngredientPageComponent}/>
                        <ProtectedRoute exact path="/order" component={OrderComponent}/>
                        <ProtectedRoute exact path="/order/bill/:id" component={BillComponent}/>
                        <Route exact path="/page_not_found" component={PageNotFoundComponent}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;