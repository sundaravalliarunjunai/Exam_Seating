import React,{useState,useEffect} from "react";
import {
  Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button, Input,Modal, Label,
  ModalHeader, ModalBody, FormGroup, Form
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentService from "./Student/Studentservice";
import UserService from "./Login/Userservice";
import DepartmentService from "./Department/DepartmentService";

export default function Student() {

  const studentState = {
    studentId:null,
    studentName: "",
    rollNo:"",
    dob:"",
    courseType:"",
    departmentId:"",
    semester:"",
  };

  const currentstudentState = {
    currentstudentId:null,
    currentstudentName: "",
    currentrollNo:"",
    currentdob:"",
    currentcourseType:"",
    currentdepartmentId:"",
    currentsemester:"",
  };

  const [studentvalue,setStudent]=useState(studentState);
  const[submitted,setSubmitted]=useState(false);
  const [studentlist,setStudentlist]=useState([]);
  const [currentstudent,setcurrentStudent]=useState(currentstudentState);
  const [departmentlist,setDepartmentlist]=useState([]);

  useEffect(() => {
    retrieveStudent();
    retrieveDepartment();
  }, []);

  const handleInputChange=event => {
    const{name,value}=event.target;
    setStudent({...studentvalue,[name]:value});
  };
  const currenthandleInputChange=event => {
    const{name,value}=event.target;
    setcurrentStudent({...currentstudent,[name]:value});
  };
  const saveStudent = (e) => {
    e.preventDefault();
    var data= {
        studentId:studentvalue.studentId,
        studentName: studentvalue.studentName,     
        rollNo:studentvalue.rollNo,
        dob:studentvalue.dob,
        courseType:studentvalue.courseType,
        departmentId:studentvalue.departmentId,
        semester:studentvalue.semester,
    };
    // alert(data);
      StudentService.create(data).then(response => {
        alert("Success");
        setStudent({
          studentId: response.data.studentId,
          studentName: response.data.studentName,
          rollNo:response.data.rollNo,
          dob:response.data.dob,
          courseType:response.data.courseType,
          departmentId:response.data.departmentId,
          semester:response.data.semester,
        });
        setSubmitted(true);
                console.log(response.data);
                retrieveStudent();
                newStudent();
      })
      .catch(e=>{
        alert(e);
        console.log(e);
      });
  };
  const newStudent = () => {
    setStudent(studentState);
    setSubmitted(false);
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

  const retrieveDepartment =() => {
    DepartmentService.getAll().then(response => {
    setDepartmentlist(response.data);
    // console.log(response.data);
  })
    .catch(e => {
    console.log(e);
    });
  };

  const updateStudent = (e) => {
      e.preventDefault();
      var data= {
          studentId: currentstudent.currentstudentId,
          studentName: currentstudent.currentstudentName,
          rollNo:currentstudent.currentrollNo,
          dob:currentstudent.currentdob,
          courseType:currentstudent.currentcourseType,
          departmentId:currentstudent.currentdepartmentId,
          semester:currentstudent.currentsemester,
      };
          // alert(data);
          StudentService.update(currentstudent.currentstudentId,data).
          then(response => {
          console.log(response.data);
          toggle1();
          alert("Success");
          retrieveStudent();            
      })
          .catch(e => {
          console.log(e);
      });
  };
  const getStudent = (id) => {
          StudentService.get(id).then(response => {
          setcurrentStudent({
          currentstudentId:response.data.studentId,
          currentstudentName:response.data.studentName,
          currentrollNo:response.data.rollNo,
          currentdob:response.data.dob,
          currentcourseType:response.data.courseType,
          currentdepartmentId:response.data.departmentId,
          currentsemester:response.data.semester,
      });
      // console.log(response.data);
      })
      .catch(e => {
          console.log(e);
  });

  };
  const deleteStudent = (id) => {
      StudentService.remove(id). then (
      response => {
          alert('Deleted Successfully...');           
      retrieveStudent();           
  })
  UserService.getAll().then((response)=>{
      response.data.filter(obj=>obj.studentId === id).map((val)=>
      UserService.remove(val.userId) .then (
          response => {}
      )
      )
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

  let i=1;

    // Modal open state
  const [modal, setModal] = React.useState(false);
  
    // Toggle for Modal
   const toggle = () => setModal(!modal);

  // Modal open state
  const [modal1, setModal1] = React.useState(false);
  
  // Toggle for Modal
  const toggle1 = () => setModal1(!modal1);
  
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Student Details</CardTitle>
                <Col md="5" ><Table><tr>
                  {/* <td><Input type='search' placeholder="Search.." className="px2 py1" aria-label="search" ></Input>
                  {/* <i class='nc-icon nc-zoom-split'></i> 
                  </td> */}
                  <td>
                  <Button color="success"
                        onClick={toggle}><i class="nc-icon nc-simple-add"></i> Add</Button>
                    <Modal isOpen={modal}
                        toggle={toggle} fade={false} >
                        {/* modalTransition={{ timeout: 2000 }} */}
                        <ModalHeader
                        toggle={toggle}>Add Student</ModalHeader>
                        <ModalBody>
                          <Form onSubmit={saveStudent}>
                            <Row>
                                <Col>
                                    <FormGroup>
                                    <Label>Student Name</Label>
                                    <Input
                                        name="studentName"
                                        onChange={handleInputChange}
                                        value={studentvalue.studentName}
                                        placeholder="Student Name"
                                        type="text" required
                                    />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                    <Label>Roll No</Label>
                                    <Input
                                        name="rollNo"
                                        onChange={handleInputChange}
                                        value={studentvalue.rollNo}
                                        placeholder="Roll number"
                                        type="text" required
                                    />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                    <Label>Date of Birth</Label>
                                    <Input
                                        name="dob"
                                        onChange={handleInputChange}
                                        value={studentvalue.dob}
                                        placeholder="YYYY-MM-DD"
                                        type="text" required
                                    />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                    <Label>Course Type</Label>
                                    <Input
                                      type={"select"}
                                      name="courseType"
                                      // size="2"
                                      onChange={handleInputChange}
                                      value={studentvalue.courseType}>
                                        <option defaultValue="">-----</option>
                                        <option value="UG">UG</option> 
                                        <option value="PG">PG</option> 
                                    </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                              <Col>
                                <FormGroup>
                                  <Label>Department</Label>
                                    <Input
                                        type={"select"}
                                        name="departmentId"
                                        // size="2"
                                        onChange={handleInputChange}
                                        value={studentvalue.departmentId}
                                      ><option defaultValue="">-----</option>
                                        {departmentlist.map(result =>(
                                          <option value={result.departmentId}>{result.departmentName}</option>
                                        ))}
                                      </Input>
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <FormGroup>
                                  <Label>Semester</Label>
                                  <Input
                                    type={"select"}
                                    name="semester"
                                    // size="2"
                                    onChange={handleInputChange}
                                    value={studentvalue.semester}>
                                      <option defaultValue="">-----</option>
                                      <option value="I">I</option> 
                                      <option value="II">II</option> 
                                      <option value="III">III</option> 
                                      <option value="IV">IV</option> 
                                      <option value="V">V</option>
                                      <option value="VI">VI</option>  
                                  </Input>
                                </FormGroup>
                                <Button color="primary" type="submit" value="Submit" onClick={toggle}>Submit</Button>
                              </Col>
                            </Row>
                          </Form>
                        </ModalBody>
                    </Modal>
                  </td></tr></Table>
                </Col>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Roll No</th>
                      <th>D.O.B</th>
                      <th>Course Type</th>
                      <th>Department</th>
                      <th>Semester</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    studentlist.map(result=>(   
                      <tr>
                        <td>{i++}</td>
                        <td>{result.studentName}</td>
                        <td>{result.rollNo}</td>
                        <td>{result.dob}</td>
                        <td>{result.courseType}</td>
                        <td>{getDepartmentName(result.departmentId)}</td>
                        <td>{result.semester}</td>
                        <td>                                            
                          <i class="fa-solid fa-pen fa-lg" onClick={() => { toggle1(); getStudent(result.studentId);}} ></i>
                          {/* <Button color="primary"
                          onClick={(()=>{toggle1();getStudent(result.studentId);})}>Edit</Button> */}
                          <Modal isOpen={modal1}
                              toggle={toggle1} backdrop={false} >
                              {/* modalTransition={{ timeout: 2000 }} */}
                              <ModalHeader
                              toggle={toggle1}>Edit Student</ModalHeader>
                              <ModalBody>
                                <Form >
                                    <Row>
                                        <Col>
                                          <FormGroup>
                                            <Label>Student Name</Label>
                                            <Input
                                                name="currentstudentName"
                                                onChange={currenthandleInputChange}
                                                value={currentstudent.currentstudentName}
                                                type="text" required
                                            />
                                          </FormGroup>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col>
                                          <FormGroup>
                                            <Label>Roll No</Label>
                                            <Input
                                                name="currentrollNo"
                                                onChange={currenthandleInputChange}
                                                value={currentstudent.currentrollNo}
                                                type="text" required
                                            />
                                          </FormGroup>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col>
                                          <FormGroup>
                                            <Label>Date of Birth</Label>
                                            <Input
                                                name="currentdob"
                                                onChange={currenthandleInputChange}
                                                value={currentstudent.currentdob}
                                                type="text" required
                                            />
                                          </FormGroup>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col>
                                          <FormGroup>
                                            <Label>Course Type</Label>
                                            <Input
                                                name="currentcourseType"
                                                onChange={currenthandleInputChange}
                                                value={currentstudent.currentcourseType}
                                                type="text" required
                                            />
                                          </FormGroup>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col>
                                          <FormGroup>
                                            <Label>Department</Label>
                                            <Input disabled
                                                name="currentdepartmentId"
                                                onChange={currenthandleInputChange}
                                                value={getDepartmentName(currentstudent.currentdepartmentId)}
                                                type="text" required
                                            />
                                          </FormGroup>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col>
                                          <FormGroup>
                                            <Label>Semester</Label>
                                            <Input
                                                name="currentsemester"
                                                onChange={currenthandleInputChange}
                                                value={currentstudent.currentsemester}
                                                type="text" required
                                            />
                                          </FormGroup>
                                          <Button color="primary" onClick={updateStudent}>Update</Button>
                                        </Col>
                                      </Row>
                                    </Form>
                              </ModalBody>
                          </Modal>
                        {/* </td><td>
                          <button class="btn btn-danger" onClick={(e) => { if (window.confirm('Are you sure! Do you want to delete this student?')) deleteStudent(result.studentId) } }>Delete</button> */}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <i class="fa-solid fa-trash fa-lg" onClick={(e) => { if (window.confirm('Are you sure! Do you want to delete this student detail?')) deleteStudent(result.studentId) } } ></i>
                        </td>
                      </tr>
                      )
                    )
                  }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

