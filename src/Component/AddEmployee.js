import React, {Fragment, useEffect, useState} from "react";
import {Button, Card, Form} from "react-bootstrap";
import axios from "axios";
import base_url from "./bootApi";
import {toast} from "react-toastify";
import {CardBody, Input} from "reactstrap";


const AddEmployee = () => {

    useEffect(() => {
        document.title = "Add Employee || Billing System";

    }, []);

    const [employee,setEmployee]= useState({});

    const handleForm = (e) =>{
        console.log(employee);
        postDataToServer(employee);
        e.preventDefault();
    };

    const postDataToServer = (data) => {
        axios.post(`${base_url}/employee/create`, data).then(
        (response) => {
            console.log(response);
            console.log("success");
            toast.success("Employee Added Successfully", {position: "bottom-center"})
            window.location.reload(false);
        },
            (error) => {
            console.log(error);
                toast.error("Something Went Wrong", {position: "bottom-center"})
            }
        );
    };
    return (
        <Card style={{ marginTop: 5,width:'115%'}}>
            <CardBody style={{backgroundColor:'#87bdd8', padding:'6px'}}>
                <h4 className="text-center">New Employee Form</h4></CardBody>
            <CardBody>
        <Fragment>
            <Form onSubmit={handleForm}>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Employee Name</Form.Label>
                <Input type="name" placeholder="Enter Employee Name" id="empName" required
                onChange={(e)=>{
                    setEmployee({...employee,empName: e.target.value});
                }}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRole">
                <Form.Label>Employee Role</Form.Label>
                <Input placeholder="Enter Employee Role" id="role" required
            onChange={(e)=>{
             setEmployee({...employee,role:e.target.value});
            }}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formWages">
                <Form.Label>Employee Wages</Form.Label>
                <Input type="number" placeholder="Enter Employee Wages" id="wagesPerHour" required
            onChange={(e)=>{
            setEmployee({...employee,wagesPerHour:e.target.value});
            }}/>

            </Form.Group>
            <Button variant="outline-primary" type="submit" size="sm" className={"m-lg-2"} style={{transition:'0.1s'}}>Submit</Button>
            <Button variant="outline-danger" type="reset" size="sm" className={"m-lg-2"} style={{transition:'0.1s'}}>Clear</Button>
        </Form>
        </Fragment>
            </CardBody>
        </Card>
    );
};

export default AddEmployee;