import React, {Fragment, useEffect, useState} from "react";
import {Button, Card, Form} from "react-bootstrap";
import {useParams} from "react-router-dom";
import axios from "axios";
import base_url from "./bootApi";
import {toast} from "react-toastify";
import {CardBody, Input} from "reactstrap";
import moment from "moment";
import {getToken} from "./Utility";

const AddExpense = () => {
    const [expense, setExpense] = useState({});

    const {empId} = useParams();
    useEffect(() => {
        document.title = "Add Expense || Billing System";
    }, []);

    const handleForm = (e) => {
        setExpense({...expense, empId: empId})

        postExpense({
            empId,
            date: expense.date,
            description: expense.description,
            amount: expense.amount
        });
        e.preventDefault();
    };

    const postExpense = (data) => {
        axios.post(`${base_url}/expense/new`, data,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        }).then(
            (response) => {
                console.log(response);
                console.log("success");
                toast.success(response.data, {position: "bottom-center"})

            },
            (error) => {
                console.log(error);
                toast.error("Something Went Wrong", {position: "bottom-center"})
            }
        );

    };


    return (
        <Card style={{ marginTop: 5, width: '115%'}}>
            <CardBody style={{backgroundColor:'#87bdd8',padding:'6px'}}>
                <h4 className="text-center">Add Expenses</h4></CardBody>
            <CardBody>
        <Fragment>
            <Form onSubmit={handleForm}>
                <Form.Group className="mb-3" controlId="formDate">
                    <Form.Label>Date</Form.Label>
                    <Input type="date" placeholder="Enter Date" id="date" required
                           onChange={(e) => {
                               setExpense({
                                   ...expense,
                                   date: moment(e.target.value, 'YYYY-MM-DD').format('DD-MM-YYYY')
                               });
                           }}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formHour">
                    <Form.Label>Amount</Form.Label>
                    <Input type="number" placeholder="Enter Amount" id="amount" required
                           onChange={(e) => {
                               setExpense({...expense, amount:e.target.value});
                           }}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formHour">
                    <Form.Label>Description</Form.Label>
                    <Input placeholder="Enter Description" id="description" required
                           onChange={(e) => {
                               setExpense({...expense, description: e.target.value});
                           }}/>
                </Form.Group>
                <Button variant="outline-primary" type="submit" size="sm" style={{transition:'0.1s'}}>Submit</Button>
                <Button variant="outline-danger" type="reset" className={"m-lg-2"} size="sm">Clear</Button>
            </Form>
        </Fragment>
            </CardBody>
        </Card>
    )
}

export default AddExpense;