import React, {Fragment, useEffect, useState} from "react";
import {Button, Card, Form} from "react-bootstrap";
import axios from "axios";
import base_url from "./bootApi";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import moment from "moment";
import {CardBody, Input} from "reactstrap";
import {getToken} from "./Utility";

const AddAttendance = () => {
    const [attendance, setAttendance] = useState({});
    const {empId} = useParams();
    console.log("attendance", empId)
    useEffect(() => {
        document.title = "Add Attendance || Billing System";
    }, []);


    const handleForm = (e) => {
        setAttendance({...attendance, empId: empId})
        console.log("empId : ", empId);
        console.log(attendance);

        postAttendance({
            empId,
            date: attendance.date,
            workingHour: attendance.workingHour
        });
        e.preventDefault();
    };

    const postAttendance = (data) => {
        console.log("data :- ", data);
        axios.post(`${base_url}/attendance/mark`, data,{
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
                <h4 className="text-center">Mark Attendance</h4></CardBody>
            <CardBody>
                <Fragment>
            <Form onSubmit={handleForm}>
                <Form.Group className="mb-3" controlId="formDate">
                    <Form.Label>Date</Form.Label>
                    <Input type="date" placeholder="Enter Date" id="date" required
                           onChange={(e) => {
                               setAttendance({
                                   ...attendance,
                                   date: moment(e.target.value, 'YYYY-MM-DD').format('DD-MM-YYYY')
                               });
                           }}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formHour">
                    <Form.Label>Working Hour</Form.Label>
                    <Input type="number" placeholder="Enter Working Hour" id="workingHour" required
                           onChange={(e) => {
                               setAttendance({...attendance, workingHour: e.target.value});
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

export default AddAttendance;