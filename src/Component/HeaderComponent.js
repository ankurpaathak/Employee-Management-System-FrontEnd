import React, {Component} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Button} from "reactstrap";

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render() {
        return (
            <div>
                <header>
                    <Navbar bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand href="#home">Employee Management</Navbar.Brand>
                            <Nav className="me-auto">
                                <Nav.Link href="#home"></Nav.Link>
                                <Nav.Link href="#features"></Nav.Link>
                                <Nav.Link href="#pricing"></Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;