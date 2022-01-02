import React from "react";
import {Container, Nav, Navbar, NavLink} from "react-bootstrap";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";

function Header(){
    return (
        <div>
            <Navbar bg="dark" expand="lg" style={{height:'55px'}}>
                <Container>
                    <Navbar.Brand href="#home" style={{color: 'white',position:'relative',right:'60px'}}>Employee Management App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Nav>
                            <Link to="/add-employee"><Button className="m-lg-2" color="info"
                            style={{position:'relative',left:'60px'}} size='sm'>Add Employee</Button></Link>
                        </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
