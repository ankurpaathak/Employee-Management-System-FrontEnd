import {Button, Card, Form} from "react-bootstrap";
import {CardBody, Input} from "reactstrap";
import React, {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import base_url from "./bootApi";
import {toast} from "react-toastify";

const UpdateEmployee=()=>{
    const {empId} = useParams();

    const [editEmployee, editSetEmployee] = useState([])

    useEffect(() => {
        document.title = "Edit Employee || Billing System";
        axios.get(`${base_url}/employee/${empId}`).then(
            (response) => {
                console.log(response);
                editSetEmployee(response.data)
            },
            (error) => {
                console.log(error);
            }
        );
    }, [empId])

    const handleEditForm=(e)=>{
        updateDataToServer(editEmployee);
        e.preventDefault();
    };

    const updateDataToServer = (data) => {
        axios.put(`${base_url}/employee/update`, data).then(
            (response) => {
                console.log(response);
                console.log("success");
                toast.success("Employee Updated Successfully", {position: "bottom-center"})
                window.location.reload(false);
            },
            (error) => {
                console.log(error);
                toast.error("Something Went Wrong", {position: "bottom-center"})
            }
        );
    };

    return (
        <Card style={{ marginTop: 5,width: '115%'}}>
            <CardBody style={{backgroundColor:'#87bdd8', padding:'6px'}}>
                <h2 className="text-center"><h4>Employee Update Form</h4></h2></CardBody>
            <CardBody>
                <Fragment>
                    <Form onSubmit={handleEditForm}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Employee Name</Form.Label>
                            <Input type="name" placeholder="Enter Employee Name" id="empName" required
                                   value={editEmployee.empName}  onChange={(e)=>{
                                editSetEmployee({...editEmployee,empName: e.target.value});
                            }}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formRole">
                            <Form.Label>Employee Role</Form.Label>
                            <Input placeholder="Enter Employee Role" id="role" required
                                   value={editEmployee.role} onChange={(e)=>{
                                editSetEmployee({...editEmployee,role: e.target.value});
                            }}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formWages">
                            <Form.Label>Employee Wages</Form.Label>
                            <Input type="number" placeholder="Enter Employee Wages" id="wagesPerHour" required
                                   value={editEmployee.wagesPerHour} onChange={(e)=>{
                                editSetEmployee({...editEmployee,wagesPerHour: e.target.value});
                            }}/>
                        </Form.Group>
                        <Button variant="outline-primary" type="submit" size="sm" className={"m-lg-2"} style={{transition:'0.1s'}}>Submit</Button>
                        <Button variant="outline-danger" type="reset" size="sm" className={"m-lg-2"}>Clear</Button>
                    </Form>
                </Fragment>
            </CardBody>
        </Card>
    );

}
export default UpdateEmployee;