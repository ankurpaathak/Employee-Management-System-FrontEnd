import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {Button} from "reactstrap";
import {deleteToken} from "./Utility";

function Header() {
    const logout = () => {
        deleteToken()
        window.location.reload();
    }
    return (
        <div>
            <Navbar bg="dark" expand="lg" style={{height: '55px'}}>
                <Container>
                    <Navbar.Brand href="#home" style={{color: 'white', position: 'relative', right: '60px'}}>Employee
                        Management App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Nav>
                        <Button className="m-lg-2" color="danger" style={{position: 'relative', left: '60px'}} size='sm'
                                onClick={logout}>Logout</Button>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
