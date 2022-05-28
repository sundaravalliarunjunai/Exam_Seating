import React,{useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Label, Form, FormGroup, Card, CardHeader, CardBody, Table, Button, Input, CardTitle, Row, Col, ModalBody, ModalHeader, ModalFooter, Modal } from "reactstrap";
import DepartmentService from "./Department/DepartmentService";
import UserService from "./Login/Userservice";
import SubjectService from "./Subject/Subjectservice";


export default function Subject() {

  const subjectState = {
    subjectId:null,
    courseType:"",
    semester:"",
    department:"",
    subjectName: "",
  };

  const currentsubjectState = {
    currentsubjectId:null,
    currentcourseType:"",
    currentsemester:"",
    currentdepartment:"",
    currentsubjectName: "",
  };

  const [subjectvalue,setSubject]=useState(subjectState);
  const[submitted,setSubmitted]=useState(false);
  const [subjectlist,setSubjectlist]=useState([]);
  const [currentsubject,setcurrentSubject]=useState(currentsubjectState);
  const [departmentlist,setDepartmentlist]=useState([]);

  useEffect(() => {
    retrieveSubject();
    retrieveDepartment();
  }, []);

  const handleInputChange=event => {
    const{name,value}=event.target;
    setSubject({...subjectvalue,[name]:value});
  };
  const currenthandleInputChange=event => {
    const{name,value}=event.target;
    setcurrentSubject({...currentsubject,[name]:value});
  };
  const saveSubject = (e) => {
    e.preventDefault();
    var data= {
        subjectId:subjectvalue.subjectId,
        courseType:subjectvalue.courseType,
        semester:subjectvalue.semester,
        department:subjectvalue.department,
        subjectName: subjectvalue.subjectName,     
    };
    // alert(data);
      SubjectService.create(data).then(response => {
        alert("Success");
        setSubject({
          subjectId: response.data.subjectId,
          courseType: response.data.courseType,
          semester: response.data.semester,
          department: response.data.department,
          subjectName: response.data.subjectName,
        });
        setSubmitted(true);
                console.log(response.data);
                retrieveSubject();
                newSubject();
      })
      .catch(e=>{
        alert(e);
        console.log(e);
      });
  };
  const newSubject = () => {
    setSubject(subjectState);
    setSubmitted(false);
  };
  const retrieveSubject =() => {
      SubjectService.getAll().then(response => {
      setSubjectlist(response.data);
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
  const updateSubject = (e) => {
      e.preventDefault();
      var data= {
          subjectId: currentsubject.currentsubjectId,
          courseType: currentsubject.currentcourseType,
          semester: currentsubject.currentsemester,
          department: currentsubject.currentdepartment,
          subjectName: currentsubject.currentsubjectName,
      };
          // alert(data);
          SubjectService.update(currentsubject.currentsubjectId,data).
          then(response => {
          console.log(response.data);
          toggle1();
          alert("Success");
          retrieveSubject();            
      })
          .catch(e => {
          console.log(e);
      });
  };
  const getSubject = (id) => {
          SubjectService.get(id).then(response => {
          setcurrentSubject({
          currentsubjectId:response.data.subjectId,
          currentcourseType:response.data.courseType,
          currentsemester:response.data.semester,
          currentdepartment:response.data.department,
          currentsubjectName:response.data.subjectName,
      });
      // console.log(response.data);
      })
      .catch(e => {
          console.log(e);
  });

  };
  const deleteSubject = (id) => {
      SubjectService.remove(id). then (
      response => {
          alert('Deleted Successfully...');           
      retrieveSubject();           
  })
  UserService.getAll().then((response)=>{
      response.data.filter(obj=>obj.subjectId === id).map((val)=>
      UserService.remove(val.userId) .then (
          response => {}
      )
      )
  })   
      .catch(e => {
      console.log(e);
  });
  };

  

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
                <CardTitle tag="h4">Subject Details</CardTitle>
                <Col md="5" ><Table><tr><td><Input type='search' placeholder="Search.." className="px2 py1" aria-label="search" ></Input>
                  {/* <i class='nc-icon nc-zoom-split'></i> */}
                  </td><td>
                  <Button color="success"
                        onClick={toggle}><i class="nc-icon nc-simple-add"></i> Add
                  </Button>
                  <Modal isOpen={modal}
                        toggle={toggle}
                        modalTransition={{ timeout: 2000 }}>
                        <ModalHeader
                        toggle={toggle}>Add Subject</ModalHeader>
                        <ModalBody>
                          <Form onSubmit={saveSubject}>
                            <Row>
                              <Col>
                                <FormGroup>
                                  <Label>Course Type</Label>
                                  <Input
                                    type={"select"}
                                    name="courseType"
                                    // size="2"
                                    onChange={handleInputChange}
                                    value={subjectvalue.courseType}>
                                      <option value="">-----</option>
                                      <option value="UG">UG</option> 
                                      <option value="PG">PG</option> 
                                  </Input>
                                  
                                  {/* <Input
                                    name="courseType"
                                    onChange={handleInputChange}
                                    value={subjectvalue.courseType}
                                    placeholder="Course Type"
                                    type="text" required
                                  /> */}
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
                                    value={subjectvalue.semester}>
                                      <option value="">-----</option>
                                      <option value="I">I</option> 
                                      <option value="II">II</option> 
                                      <option value="III">III</option> 
                                      <option value="IV">IV</option> 
                                      <option value="V">V</option>
                                      <option value="VI">VI</option>  
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
                                        name="department"
                                        // size="2"
                                        onChange={handleInputChange}
                                        value={subjectvalue.department}
                                      >
                                        {departmentlist.map(result =>(
                                          <option value={result.departmentName}>{result.departmentName}</option>
                                        ))}
                                      </Input>
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <FormGroup>
                                  <Label>Subject Name</Label>
                                  <Input
                                    name="subjectName"
                                    onChange={handleInputChange}
                                    value={subjectvalue.subjectName}
                                    placeholder="Subject Name"
                                    type="text" required
                                  />
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
                {/* <Button href="/Subject/Add" onClick={()=>history.push("/add")} >
                  Add <i class="nc-icon nc-simple-add"></i>
                </Button>  */}
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>#</th>
                      <th>Course Type</th>
                      <th>Semester</th>
                      <th>Department</th>
                      <th>Subject Name</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                    subjectlist.map(result=>(   
                      <tr>
                        <td>{i++}</td>
                        <td>{result.courseType}</td>
                        <td>{result.semester}</td>
                        <td>{result.department}</td>
                        <td>{result.subjectName}</td>                        
                        <td>                                            
                          <i class="fa-solid fa-pen fa-lg" onClick={() => { toggle1(); getSubject(result.subjectId);}} ></i>
                          {/* <Button color="primary"
                          onClick={(()=>{toggle1();getSubject(result.subjectId);})}>Edit</Button> */}
                          <Modal isOpen={modal1}
                              toggle={toggle1}
                              modalTransition={{ timeout: 2000 }}>
                              <ModalHeader
                              toggle={toggle1}>Edit Subject</ModalHeader>
                              <ModalBody>
                              <Form >
                                <Row>
                                    <Col>
                                        <FormGroup>
                                        <Label>Course Type</Label>
                                        <Input
                                            name="currentcourseType"
                                            onChange={currenthandleInputChange}
                                            value={currentsubject.currentcourseType}
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
                                            value={currentsubject.currentsemester}
                                            type="text" required
                                        />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                        <Label>Department</Label>
                                        <Input
                                            name="currentdepartment"
                                            onChange={currenthandleInputChange}
                                            value={currentsubject.currentdepartment}
                                            type="text" required
                                        />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                        <Label>Subject Name</Label>
                                        <Input
                                            name="currentsubjectName"
                                            onChange={currenthandleInputChange}
                                            value={currentsubject.currentsubjectName}
                                            type="text" required
                                        />
                                        </FormGroup>
                                        <Button color="primary" onClick={updateSubject}>Update</Button>
                                    </Col>
                                </Row>
                              </Form>
                              </ModalBody>
                          </Modal>
                        </td><td>
                          <button class="btn btn-danger" onClick={(e) => { if (window.confirm('Are you sure! Do you want to delete this subject?')) deleteSubject(result.subjectId) } }>Delete</button>
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
