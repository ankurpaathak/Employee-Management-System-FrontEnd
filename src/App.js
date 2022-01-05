import './App.css';
import {ToastContainer} from "react-toastify";
import {Container, Row} from "react-bootstrap";
import {Col} from "reactstrap";
import Header from "./Component/Header";
import EmployeeList from "./Component/EmployeeList";
import AddEmployee from "./Component/AddEmployee";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AddAttendance from "./Component/AddAttendance";
import AddExpense from "./Component/AddExpense";
import EmployeeDetails from "./Component/EmployeeDetails";
import UpdateEmployee from "./Component/UpdateEmployee";
import UpdateAttendance from "./Component/UpdateAttendance";
import UpdateExpense from "./Component/UpdateExpense";

function App() {
    return (
        <div>
            <Router>
                <ToastContainer/>
                <Header/>
                <Container style={{position:'relative',right:'4.5%'}}>
                    <Row>
                        <Col md={4}>
                            <EmployeeList/>
                        </Col>
                        <Col md={8}>
                            <Routes>
                                <Route path="/add-employee" element={<AddEmployee/>} exact/>
                                <Route path="/add-attendance/:empId" element={<AddAttendance/>} exact/>
                                <Route path="/add-expense/:empId" element={<AddExpense/>} exact/>
                                <Route path="/employee-details/:empId" element={<EmployeeDetails/>} exact/>
                                <Route path="/update-employee/:empId" element={<UpdateEmployee/>} exact/>
                                <Route path="/update-attendance/:attendanceId/:empId" element={<UpdateAttendance/>} exact/>
                                <Route path="/update-expense/:expenseId/:empId" element={<UpdateExpense/>} exact/>
                            </Routes>
                        </Col>
                    </Row>
                </Container>
            </Router>
        </div>

    );
}

export default App;
