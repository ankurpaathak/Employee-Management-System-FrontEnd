import React, {useEffect, useState} from "react";
import axios from "axios";
import base_url from "./bootApi";
import {Table} from "react-bootstrap";
import moment from "moment";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";

const GetAllAttendance = ({empId,month,year}) => {
    const [attendanceList, setAttendance] = useState([])
    useEffect(() => {
        document.title = "Employee Detail || Billing System";
        axios.get(`${base_url}/attendance/employee/?empId=${empId}&month=${month}&year=${year}`).then(
            (response) => {
                console.log(response);
                setAttendance(response.data)
            },
            (error) => {
                console.log(error);
            }
        );
    }, [empId,month,year])
    return (
        <div>
            <Table striped bordered hover size="sm">
                <thead>
                <tr className={"text-center"}>
                    <th>Id</th>
                    <th>Date</th>
                    <th>Hour</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>{attendanceList.map((item) =>
                <tr className={"text-center"}>
                    <td>{item.attendanceId}</td>
                    <td>{moment(item.date).format('DD-MM-YYYY')}</td>
                    <td>{item.workingHour}</td>
                    <td><Link to={`/update-attendance/${item.attendanceId}/${empId}`}>
                        <Button color="danger" size="sm">Edit</Button></Link></td>
                </tr>)}
                </tbody>
            </Table>
        < /div>
    )

}
export default GetAllAttendance;


