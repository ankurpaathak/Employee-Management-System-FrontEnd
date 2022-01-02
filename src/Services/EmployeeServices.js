import axios from "axios";

const Employee_Service_Base_Url = "http://localhost:8080/employee/getAll";
const AddEmployee_Service_Base_Url = "http://localhost:8080/employee/create";

class EmployeeServices {

    getEmployees(){
        return axios.get(Employee_Service_Base_Url);
    }

    createEmployee(employee){
        return axios.post(AddEmployee_Service_Base_Url, employee);
    }
}

export default new EmployeeServices()