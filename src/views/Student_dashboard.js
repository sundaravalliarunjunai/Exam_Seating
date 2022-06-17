import React,{useEffect,useState} from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Table,
  Col,
} from "reactstrap";
import {getStudentId} from './Login/Common.js';
import StudentService from "./Student/Studentservice.js";
import DepartmentService from "./Department/DepartmentService.js";
import StudentPlanService from "./Generate/StudentPlanService.js";

function Student_dashboard() {

  const [studentlist,setStudentlist]=useState([]);
  const [studentPlanlist,setStudentPlanlist]=useState([]);
  const [studentId,setStudentId]=React.useState([]);
  const [departmentlist,setDepartmentlist]=useState([]); 

  useEffect(() => {
    retrieveStudent();
    retrieveStudentPlan();
    retrieveDepartment();
    setStudentId(getStudentId());
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

  const retrieveStudentPlan =() => {
    StudentPlanService.getAll().then(response => {
    setStudentPlanlist(response.data);
    // console.log(response.data);
    })
        .catch(e => {
        console.log(e);
    });
  };

  const retrieveStudent =() => {
    StudentService.getAll().then(response => {
    setStudentlist(response.data);
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
    return studentPlanlist.filter(obj=> Number(obj.studentId) === Number(id)).map(result=>{
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
                      {studentlist.filter(ob=> ob.studentId === studentId ).map(result=>(
                        <tr>
                          <tr><th>Student Name</th><td>{result.studentName}</td></tr>
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
                      <CardTitle tag="p">Number Of Exams<br></br>{getNumberofexams(studentId)}</CardTitle>
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

export default Student_dashboard;
