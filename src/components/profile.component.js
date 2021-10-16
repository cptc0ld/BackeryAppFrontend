import React, {Component} from "react";
import AuthService from "../services/auth.service";
import {Col, Container, Row} from "react-bootstrap";

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser()
        };
    }

    render() {
        const {currentUser} = this.state;
        return (
            <Container className="bg-light p-5 m-5">
                <Row className="justify-content-center">
                    <Col md={2} className="m-3 align-content-center">
                        <img
                            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                            alt="profile-img"
                            className="profile-img-card"
                        />
                    </Col>
                    <Col>
                        <Row>
                            <h2>
                                <strong>User Profile</strong>
                            </h2>
                        </Row>
                        <Row>
                            <p>
                                <strong>Username:</strong>{" "}
                                {currentUser.username}
                            </p>
                        </Row>
                        <Row>
                            <p>
                                <strong>Email:</strong>{" "}
                                {currentUser.email}
                            </p>
                        </Row>

                            {currentUser.is_admin ? (
                                <Row>
                                    <p>
                                        <strong>Admin:</strong>{" "}
                                        true
                                    </p>
                                </Row>
                            ) : (<div/>)}
                    </Col>
                </Row>
            </Container>
        );
    }
}