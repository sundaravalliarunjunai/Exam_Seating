import React,{useEffect,useState} from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import {getStaffId} from './Login/Common.js';
import StaffService from "./Staff/Staffservice";
import DepartmentService from "./Department/DepartmentService";
import StaffPlanService from "./Generate/StaffPlanService";

function Staff_dashboard() {

  const [stafflist,setStafflist]=useState([]);
  const [staffPlanlist,setStaffPlanlist]=useState([]);
  const [staffId,setStaffId]=React.useState([]);
  const [departmentlist,setDepartmentlist]=useState([]);  

  useEffect(() => {
    retrieveStaff();
    retrieveStaffPlan();
    retrieveDepartment();
    setStaffId(getStaffId());
  }, []);

  const retrieveDepartment =() => {
    DepartmentService.getAll().then(response => {
    setDepartmentlist(response.data);
    // console.log(response.data);
    })
        .catch(e => {
        console.log(e);
    });
  };

  const retrieveStaffPlan =() => {
    StaffPlanService.getAll().then(response => {
    setStaffPlanlist(response.data);
    // console.log(response.data);
    })
        .catch(e => {
        console.log(e);
    });
  };

  const retrieveStaff =() => {
    StaffService.getAll().then(response => {
    setStafflist(response.data);
    // console.log(response.data);
    })
        .catch(e => {
        console.log(e);
    });
  };

  function getDepartmentName(id){
    return departmentlist.filter(obj=> Number(obj.departmentId) === Number(id)).map(result=>{
      return result.departmentName;
    })
  }

  function getNumberofexams(id){
    return staffPlanlist.filter(obj=> Number(obj.staffId) === Number(id)).map(result=>{
      return JSON.parse(result.schedule).length;
    })
  }

  return (
    <>
      <div className="content">
      <Row>
          <Col lg="6" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="2" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i class="fa-solid fa-user"></i>
                    </div>
                  </Col>
                  <Col md="3" xs="4">
                    <div className="numbers">
                      <p className="card-category"></p>
                      <CardTitle tag="p">Profile</CardTitle>
                      <p />                      
                    </div>
                    <Table className="ml-2">
                      {stafflist.filter(ob=> ob.staffId === staffId ).map(result=>(
                        <tr>
                          <tr><th>Staff Name</th><td>{result.staffName}</td></tr>
                          <tr><th>DOB</th><td>{result.dob}</td></tr>
                          <tr><th>Department</th><td>{getDepartmentName(result.departmentId)}</td></tr>                          
                        </tr>
                      ))}
                    </Table>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i class="nc-icon nc-shop"></i>
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category"></p>
                      <CardTitle tag="p">Number Of Exams<br></br>{getNumberofexams(staffId)}</CardTitle>
                      <p />
                    </div>
                                          
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div></div>
      </div>
    </>
  );
}

export default Staff_dashboard;
