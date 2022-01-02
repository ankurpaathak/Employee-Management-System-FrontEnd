import React, {useEffect, useState} from "react";
import axios from "axios";
import base_url from "./bootApi";
import {Table} from "react-bootstrap";
import moment from "moment";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";


const GetAllExpense=({empId,month,year})=> {
    const [expenseList, setExpense] = useState([])
    useEffect(() => {
        document.title = "Employee Detail || Billing System";
        axios.get(`${base_url}/expense/employee/?empId=${empId}&month=${month}&year=${year}`).then(
            (response) => {
                console.log(response);
                setExpense(response.data)
            },
            (error) => {
                console.log(error);
            }
        );
    }, [empId,month,year])
    return (
        <div>
            <Table bordered striped hover size="sm">
                <thead>
                <tr className={"text-center"}>
                    <th>Id</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {expenseList.map((item) =>
                    <tr className={"text-center"}>
                        <td>{item.expenseId}</td>
                        <td>{moment(item.date).format('DD-MM-YYYY')}</td>
                        <td>{item.description}</td>
                        <td>{item.amount}</td>
                        <td><Link to={`/update-expense/${item.expenseId}/${empId}`}>
                            <Button color="danger" size="sm">Edit</Button></Link></td>
                    </tr>)}
                </tbody>
            </Table>
        < /div>
    )

}

export default GetAllExpense;