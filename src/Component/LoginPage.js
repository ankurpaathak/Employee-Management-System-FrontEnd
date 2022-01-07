import React, {useEffect, useState} from "react";
import {Button, Card, Form, FormGroup} from "react-bootstrap";
import {CardBody, Input, Label} from "reactstrap";
import axios from "axios";
import base_url from "./bootApi";
import {toast, ToastContainer} from "react-toastify";
import Cookies from 'universal-cookie';
import App from "../App";
import {getToken} from "./Utility";

const LoginPage = () => {

    document.title = "Login Page || Billing System";
    const [login, setLogin] = useState({});

    useEffect(() => {
        if (login.success === true) {
            console.log("login success ", login)
            return <App/>
        }
    }, [login])

    const token = getToken()
    console.log("tok ", token)
    if (token) {
        return <App/>
    }

    const handleForm = (e) => {
        loginToServer(login);
        e.preventDefault();
    }

    const loginToServer = (data) => {
        axios.post(`${base_url}/auth`, data).then(
            (response) => {
                console.log("token Received")
                toast.success("Login Successfully", {position: "bottom-center"})
                const cookies = new Cookies();
                cookies.set('token', response.data.token);
                setLogin({...login, success: true})
            },
            (error) => {
                toast.error("Wrong Login Id Or Password", {position: "bottom-center"})
            }
        );
    };

    return (
        <div>
            <ToastContainer/>
            <Card style={{width: '20rem', height: '100%', marginTop: '5%', position: 'relative', left: '37%'}}>
                <CardBody style={{backgroundColor: '#87bdd8', padding: '6px'}}>
                    <h4 className="text-center">Login</h4></CardBody>
                <CardBody>
                    <Form onSubmit={handleForm}>
                        <FormGroup>
                            <Label for="exampleLogin">
                                Login id
                            </Label>
                            <Input
                                id="exampleLogin" required
                                name="login"
                                placeholder="Enter Login id"
                                type="login"
                                onChange={(e) => {
                                    setLogin({...login, username: e.target.value})
                                }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">
                                Password
                            </Label>
                            <Input
                                id="examplePassword" required
                                name="password"
                                placeholder="Enter Password"
                                type="password"
                                onChange={(e) => {
                                    setLogin({...login, password: e.target.value})
                                }}
                            />
                        </FormGroup>
                        <br/>
                        <Button variant="outline-primary" type="submit" style={{transition: '0.1s'}}
                                size='sm'>Login</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>


    )
}

export default LoginPage;