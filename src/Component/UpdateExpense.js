import React, {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import base_url from "./bootApi";
import {toast} from "react-toastify";
import {Button, Card, Form} from "react-bootstrap";
import {CardBody, Input} from "reactstrap";
import moment from "moment";
import {getToken} from "./Utility";

const UpdateExpense = () => {
    const [editExpense, editSetExpense] = useState({})
    const {expenseId, empId} = useParams();
    const [date] = useState(editExpense.date);

    useEffect(() => {
        document.title = "Edit Expense || Billing System";
        axios.get(`${base_url}/expense/${expenseId}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        }).then(
            (response) => {
                console.log(response);
                editSetExpense(response.data)
            },
            (error) => {
                console.log(error);
            }
        );
    }, [expenseId])

    const handleUpdateExpenseForm = (e) => {
        editSetExpense({...editExpense, empId: empId, expenseId: expenseId})

        updateExpenseToServer({
            expenseId,
            empId,
            date: editExpense.date,
            amount: editExpense.amount,
            description: editExpense.description
        });
        e.preventDefault();
    };

    const updateExpenseToServer = (data) => {
        axios.put(`${base_url}/expense/update`, data,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        }).then(
            (response) => {
                console.log(response);
                console.log("success");
                toast.success("Expense Updated Successfully", {position: "bottom-center"})
            },
            (error) => {
                console.log(error);
                toast.error("Something Went Wrong", {position: "bottom-center"})
            }
        );
    };

    const clearField=()=>{
        editSetExpense("");
    }

    return (
        <Card style={{marginTop: 5, width: '115%'}}>
            <CardBody style={{backgroundColor: '#87bdd8', padding: '6px'}}>
                <h4 className="text-center">Expense Update Form</h4></CardBody>
            <CardBody>
                <Fragment>
                    <Form onSubmit={handleUpdateExpenseForm}>
                        <Form.Group className="mb-3" controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <Input type="date" placeholder="Enter Date" id="date"
                                   value={date}
                                   onChange={(e) => {
                                       editSetExpense({
                                           ...editExpense,
                                           date:moment(e.target.value,'YYYY-MM-DD').format('DD-MM-YYYY')
                                       });
                                   }}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formAmount">
                            <Form.Label>Amount</Form.Label>
                            <Input type="number" placeholder="Enter Amount" id="amount" required
                                   value={editExpense.amount}
                                   onChange={(e) => {
                                       editSetExpense({...editExpense, amount: e.target.value});
                                   }
                                   }/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Input placeholder="Enter Description" id="description" required
                                   value={editExpense.description}
                                   onChange={(e) => {
                                       editSetExpense({...editExpense, description: e.target.value});
                                   }
                                   }/>
                        </Form.Group>
                        <Button variant="outline-primary" type="submit" style={{transition: '0.1s'}}
                                size='sm'>Submit</Button>
                        <Button variant="outline-danger" type="reset" className={"m-lg-2"} size='sm' onClick={clearField}>Clear</Button>
                    </Form>
                </Fragment>
            </CardBody>
        </Card>
    );

}
export default UpdateExpense;