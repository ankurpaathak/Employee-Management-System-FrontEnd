import React, {useEffect, useState} from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import base_url from "./bootApi";
import {CardBody, CardTitle} from "reactstrap";


const Employee = ({employee}) => {
    return <>
        <Link to={`/employee-details/${employee.empId}`} style={{textDecoration:'none'}}>
        <Card style={{ marginTop: 5}}>
            <CardBody>
                <CardTitle className={"text-center"} style={{ color: '#000000' }}><h5>{employee.empName}</h5></CardTitle>
                <hr style={{height:'2px'}}/>
                <Card.Text>
                    <Row className={"text-center"}>
                        <Col style={{color:'#000000'}}>{employee.role}</Col>
                        <Col style={{color:'#000000'}}>{employee.wagesPerHour}</Col>
                    </Row>
                </Card.Text>
                <Row className={"text-center"} style={{position:'relative',left:'5px'}}>
                    <Col><Link to={`/add-attendance/${employee.empId}`}>
                        <Button variant="primary" size="sm">Attendance</Button></Link></Col>
                    <Col><Link to={`/add-expense/${employee.empId}`}>
                        <Button variant="warning" size="sm">Expense</Button></Link></Col>
                    <Col><Link to={`/update-employee/${employee.empId}`}>
                        <Button variant="info" size="sm">Update</Button></Link></Col>
                </Row>
            </CardBody>
        </Card>
    </Link>
        </>
}

const Employees = () => {
    useEffect(()=>{
        document.title = "Employee List || Billing System";
        axios.get(`${base_url}/employee/getAll`).then(
            (response) => {
                console.log(response);
                setEmployee(response.data)
            },
            (error) => {
                console.log(error);
            }
        );
    },[])

    const [employeeList, setEmployee] = useState([])
    return (
        <div style={{height: '90vh', overflow: 'auto'}}>
            {employeeList.map((item) => <Employee key={item.empId} employee={item}/>)}
        < /div>
    )
}

export default Employees;