import React, {useEffect, useState} from "react";
import axios from "axios";
import base_url from "./bootApi";
import {Col, Row} from "react-bootstrap";
import {getToken} from "./Utility";

const EmployeeSalaryDetails = ({empId, month, year}) => {
    const [salary, setSalary] = useState([])

    useEffect(() => {
        document.title = "Employee Detail || Billing System";
        axios.get(`${base_url}/salary/employee/${empId}?month=${month}&year=${year}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        }).then(
            (response) => {
                console.log(response);
                setSalary(response.data)
            },
            (error) => {
                console.log(error);
                setSalary({})
            }
        );
    }, [empId,month,year])

    return (
        <div>
            <Row>
                <Col>
                    <Row><Col><h6><b>Total Hour</b></h6></Col><Col><h6>{salary.totalWorkingHour}</h6></Col></Row>
                    <Row><Col><h6><b>Total Expense</b></h6></Col><Col><h6>{salary.totalExpense}</h6></Col></Row>
                    <Row><Col><h6><b>Gross Salary</b></h6></Col><Col><h6>{salary.grossSalary}</h6></Col></Row>
                    <Row><Col><h6><b>Net Salary</b></h6></Col><Col><h6>{salary.netSalary}</h6></Col></Row>
                </Col>
            </Row>
        </div>
    )
}
export default EmployeeSalaryDetails;