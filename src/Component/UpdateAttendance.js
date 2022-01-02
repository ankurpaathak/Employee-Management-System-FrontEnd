import {useParams} from "react-router-dom";
import React, {Fragment, useEffect, useState} from "react";
import axios from "axios";
import base_url from "./bootApi";
import {toast} from "react-toastify";
import {Button, Card, Form} from "react-bootstrap";
import {CardBody, Input} from "reactstrap";
import moment from "moment";

const UpdateAttendance = () => {
    const [editAttendance, editSetAttendance] = useState({})
    const [date, setDate] = useState()
    const {attendanceId, empId} = useParams();

    useEffect(() => {
        console.log("called 1")

        document.title = "Edit Attendance || Billing System";
        axios.get(`${base_url}/attendance/${attendanceId}`).then(
            (response) => {
                console.log(response);
                editSetAttendance(response.data)
                setDate(response.data.date)
            },
            (error) => {
                console.log(error);
            }
        );
    }, [attendanceId])

    useEffect(() => {
        console.log("date : ", date)
    }, [date])

    const handleUpdateAttendanceForm = (e) => {
        // editSetAttendance({...editAttendance, empId: empId})
        editSetAttendance({...editAttendance, empId: empId, attendanceId: attendanceId})

        updateAttendanceToServer({
            attendanceId,
            empId,
            date: editAttendance.date,
            workingHour: editAttendance.workingHour
        });
        e.preventDefault();
    };


    const updateAttendanceToServer = (data) => {
        axios.put(`${base_url}/attendance/update`, data).then(
            (response) => {
                console.log(response);
                console.log("success");
                toast.success("Attendance Updated Successfully", {position: "bottom-center"})
            },
            (error) => {
                console.log(error);
                toast.error("Something Went Wrong", {position: "bottom-center"})
            }
        );
    };

    return (
        <Card style={{marginTop: 5, width: '115%'}}>
            <CardBody style={{backgroundColor:'#87bdd8',padding:'6px'}}>
                <h4 className="text-center">Attendance Update Form</h4></CardBody>
            <CardBody>
                <Fragment>
                    <Form onSubmit={handleUpdateAttendanceForm}>
                        <Form.Group className="mb-3" controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <Input type="date" placeholder="Enter Date" id="date"
                                   value={moment(editAttendance.date).format('YYYY-MM-DD')}
                                   onChange={(e) => {
                                       console.log(e.target.value)
                                       console.log(moment(e.target.value).format('DD-MM-YYYY'))
                                       editSetAttendance({
                                           ...editAttendance,
                                           // date: e.target.value
                                           date: moment(e.target.value).format('DD-MM-YYYY')
                                       });
                                   }}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formHour">
                            <Form.Label>Working Hour</Form.Label>
                            <Input type="number" placeholder="Enter Working Hour" id="workingHour" required
                                   value={editAttendance.workingHour}
                                   onChange={(e) => {
                                       editSetAttendance({...editAttendance, workingHour: e.target.value});
                                   }
                                   }/>
                        </Form.Group>
                        <Button variant="outline-primary" type="submit" style={{transition: '0.1s'}}
                                size='sm'>Submit</Button>
                        <Button variant="outline-danger" type="reset" className={"m-lg-2"} size='sm'>Clear</Button>
                    </Form>
                </Fragment>
            </CardBody>
        </Card>
    );


}

export default UpdateAttendance;