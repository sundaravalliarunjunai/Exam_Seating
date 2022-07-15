import React,{useState,useEffect} from "react";
import { Redirect } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import StaffService from "./Staff/Staffservice";
import StudentService from "./Student/Studentservice";
import {removeUserSession, getUserType} from '../views/Login/Common.js';

const usertype=getUserType();

function Dashboard() {

  const [stafflist,setStafflist]=useState([]);
  const[studentlist,setStudentlist]=useState([]);

  useEffect(() => {
    retrieveStaff();
    retrieveStudent();
  }, []);

  const retrieveStaff =() => {    
    StaffService.getAll().then(response => {
      setStafflist(response.data);
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

  function getNumberofStaff (){
    return stafflist.filter(obj=>obj.staffId).length
  }

  function getNumberofStudent (){
    return studentlist.filter(obj=>obj.studentId).length
  }

  if(usertype === 'student' || usertype === 'staff' || usertype === ''){
    return <Redirect to="/login" />
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col lg="4" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i class="nc-icon nc-single-02"></i>
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Number of Staffs</p>
                      <CardTitle tag="p">
                        {getNumberofStaff()}
                      </CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                    <i class="nc-icon nc-hat-3"></i>
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Number Of Students</p>
                      <CardTitle tag="p">
                        {getNumberofStudent()}
                      </CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i class="nc-icon nc-single-copy-04"></i>
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Number of Courses</p>
                      <CardTitle tag="p">2</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
