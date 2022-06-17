import React,{useState,useEffect} from "react";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  // CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart
} from "variables/charts.js";
import StaffService from "./Staff/Staffservice";
import StudentService from "./Student/Studentservice";


function Dashboard() {

  const [stafflist,setStafflist]=useState([]);
  const[studentlist,setStudentlist]=useState([]);

  useEffect(() => {
    retrieveStaff();
    retrieveStudent();
  }, []);

  const retrieveStaff =() => {
    //alert("Retrive building List...")
    StaffService.getAll().then(response => {
      setStafflist(response.data);
       // console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };
  
  const retrieveStudent =() => {
    //alert("Retrive building List...")
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
        {/* <div></div>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Exam Appearing Students</CardTitle>
                <p className="card-category">Percentage</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={dashboard24HoursPerformanceChart.data}
                  options={dashboard24HoursPerformanceChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
            </Card>
          </Col>
        </Row> */}
      </div>
    </>
  );
}

export default Dashboard;
