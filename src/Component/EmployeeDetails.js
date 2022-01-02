import {Card, Col, Container, FormSelect, Row} from "react-bootstrap";
import {CardBody, CardSubtitle, CardTitle} from "reactstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import base_url from "./bootApi";
import {useParams} from "react-router-dom";
import GetAllAttendance from "./GetAllAttendance";
import GetAllExpense from "./GetAllExpense";
import EmployeeSalaryDetails from "./EmployeeSalaryDetails";
import moment from "moment";

const EmployeeDetails = () => {

    const {empId} = useParams();
    console.log("empId ", empId)

    const [employee, setEmployee] = useState([])
    let currentMonth = moment().format("MMMM")
    let currentYear = moment().format("YYYY")
    let yearArray = [];
    for (let i = Number(currentYear); i > Number(currentYear) - 5; i--) {
        yearArray.push(i);
    }
    const [month, setMonth] = useState([]);
    const [year, setYear] = useState([]);

    useEffect(() => {
        setMonth(currentMonth)
        setYear(currentYear)
    }, [])

    useEffect(() => {
        document.title = "Employee Detail || Billing System";
        axios.get(`${base_url}/employee/${empId}`).then(
            (response) => {
                console.log(response);
                setEmployee(response.data)
            },
            (error) => {
                console.log(error);
            }
        );
    }, [empId])


    return (
        <Container>
            <Card style={{marginTop: 5, width: '120%'}}>
                <CardBody style={{backgroundColor: '#87bdd8', padding: '3px', height:'45px'}}>
                    <CardTitle tag="h3" className={"text-center"}><Row><Col>Employee Detail</Col>
                        <Col>
                            <Row>
                                <Col>
                                    <FormSelect value={month} onChange={(e) => {
                                        setMonth(e.target.value);
                                        // currentMonth = e.target.value;
                                        console.log("month:", month)
                                    }}>
                                        <option selected={currentMonth}
                                                value={currentMonth}>{currentMonth}</option>
                                        {moment.months().map((month) => <option value={month}>{month}</option>)}
                                    </FormSelect>
                                </Col>
                                <Col>
                                    <FormSelect value={year} onChange={(e) => {
                                        // currentYear = e.target.value;
                                        setYear(e.target.value);
                                        console.log("ViewEmployee Year: ", year)
                                    }}>
                                        <option selected={currentYear}
                                                value={currentYear}>{currentYear}</option>
                                        {yearArray.map((year) => <option value={year}>{year}</option>)}
                                    </FormSelect>
                                </Col>
                            </Row>
                        </Col>
                    </Row></CardTitle>
                </CardBody>
                <CardBody style={{backgroundColor: '', position:'relative',left:'8%',height:'120px'}}>
                    <Row>
                        <Col>
                            <Row><Col><h6><b>Id</b></h6></Col><Col><h6>{employee.empId}</h6></Col></Row>
                            <Row><Col><h6><b>Name</b></h6></Col><Col><h6>{employee.empName}</h6></Col></Row>
                            <Row><Col><h6><b>Role</b></h6></Col><Col><h6>{employee.role}</h6></Col></Row>
                            <Row><Col><h6><b>Wages</b></h6></Col><Col><h6>{employee.wagesPerHour}</h6></Col></Row>
                        </Col>
                        <Col>
                            <EmployeeSalaryDetails key={empId} empId={empId} month={month} year={year}/>
                        </Col>
                    </Row>
                </CardBody>
                <CardBody style={{backgroundColor: ''}}>
                    <Row>
                        <Col>
                            <CardBody style={{backgroundColor: '#87bdd8', padding: '6px', height: '30px'}}>
                                <CardSubtitle className={"text-center"}><h5>
                                    Attendance</h5></CardSubtitle>
                            </CardBody>
                            <GetAllAttendance key={empId} empId={empId} month={month} year={year}/>
                        </Col>
                        <Col>
                            <CardBody style={{backgroundColor: '#87bdd8', padding: '6px', height: '30px'}}>
                                <CardSubtitle className={"text-center"}><h5>
                                    Expense</h5></CardSubtitle>
                            </CardBody>
                            <GetAllExpense key={empId} empId={empId} month={month} year={year}/>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Container>

    )
}

export default EmployeeDetails;