import React,{useState,useEffect} from "react";
import {
  Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button, Input,Modal, ModalFooter,
  ModalHeader, ModalBody
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Addstudent from './Student/Addstudent';
import StudentService from "./Student/Studentservice";
import Edit_student from "./Student/Edit_student";
import UserService from "./Login/Userservice";

export default function Student() {

  const studentState = {
    studentId:null,
    studentName: "",
    regNo:"",
    dob:"",
    courseType:"",
    department:"",
    semester:"",
  };

  const currentstudentState = {
    currentstudentId:null,
    currentstudentName: "",
    currentregNo:"",
    currentdob:"",
    currentcourseType:"",
    currentdepartment:"",
    currentsemester:"",
  };

  const [studentvalue,setStudent]=useState(studentState);
  const[submitted,setSubmitted]=useState(false);
  const [studentlist,setStudentlist]=useState([]);
  const [currentstudent,setcurrentStudent]=useState(currentstudentState);

  useEffect(() => {
    retrieveStudent();
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
        regNo:studentvalue.regNo,
        dob:studentvalue.dob,
        courseType:studentvalue.courseType,
        department:studentvalue.department,
        semester:studentvalue.semester,
    };
    // alert(data);
      StudentService.create(data).then(response => {
        alert("Success");
        setStudent({
          studentId: response.data.studentId,
          studentName: response.data.studentName,
          regNo:response.data.regNo,
          dob:response.data.dob,
          courseType:response.data.courseType,
          department:response.data.department,
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
  const updateStudent = (e) => {
      e.preventDefault();
      var data= {
          studentId: currentstudent.currentstudentId,
          studentName: currentstudent.currentstudentName,
          regNo:currentstudent.currentregNo,
          dob:currentstudent.currentdob,
          courseType:currentstudent.currentcourseType,
          department:currentstudent.currentdepartment,
          semester:currentstudent.currentsemester,
      };
          // alert(data);
          StudentService.update(currentstudent.currentstudentId,data).
          then(response => {
          console.log(response.data);
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
          currentregNo:response.data.regNo,
          currentdob:response.data.dob,
          currentcourseType:response.data.courseType,
          currentdepartment:response.data.department,
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

  
  const handlebuttonChange = () => {
    setStudent(!getStudent);
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
                <Col md="5" ><Table><tr><td><Input type='search' placeholder="Search.." className="px2 py1" aria-label="search" ></Input>
                  {/* <i class='nc-icon nc-zoom-split'></i> */}
                  </td><td>
                  <Button color="success"
                        onClick={toggle}><i class="nc-icon nc-simple-add"></i> Add</Button>
                    <Modal isOpen={modal}
                        toggle={toggle}
                        modalTransition={{ timeout: 2000 }}>
                        <ModalHeader
                        toggle={toggle}>Add Student</ModalHeader>
                        <ModalBody>
                            <Addstudent />
                        </ModalBody>
                        {/* <ModalFooter>
                            <Button color="primary" onClick={toggle}>Save</Button>
                        </ModalFooter> */}
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
                      <th>Reg No</th>
                      <th>D.O.B</th>
                      <th>Course Type</th>
                      <th>Department</th>
                      <th>Semester</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    studentlist.map(result=>(   
                      <tr>
                        <td>{i++}</td>
                        <td>{result.studentName}</td>
                        <td>{result.regNo}</td>
                        <td>{result.dob}</td>
                        <td>{result.courseType}</td>
                        <td></td>
                        <td>{result.semester}</td>
                        <td>                                            
                          {/* <button class="btn btn-primary" onClick={( () => getStudent(result.studentId) )}>Edit</button> */}
                          <Button color="primary"
                          onClick={(()=>{toggle1();getStudent(result.studentId);})}>Edit</Button>
                          <Modal isOpen={modal1}
                              toggle={toggle1}
                              modalTransition={{ timeout: 2000 }}>
                              <ModalHeader
                              toggle={toggle1}>Edit Student</ModalHeader>
                              <ModalBody>
                                  <Edit_student/>
                              </ModalBody>
                          </Modal>
                        </td><td>
                          <button class="btn btn-danger" onClick={(e) => { if (window.confirm('Are you sure! Do you want to delete this student?')) deleteStudent(result.studentId) } }>Delete</button>
                        </td>
                      </tr>
                      )
                    )
                  }
                    {/* <tr>
                      <td className="text-center" >1</td>
                      <td>S.Varshini</td>
                      <td>20801917</td>
                      <td>10-07-2000</td>
                      <td className="text-center">I</td>
                      <td className="text-center">MCA</td>
                      <td className="text-center">MCA</td>
                      <td className="text-center">PG</td>
                      <td className="text-center">II</td>
                        <td className="text-center" >
                        <button class="btn btn-primary" 
                          //onclick="GetDetails('.$purchaseid.')"
                          >Edit</button>
                        </td>
                        <td>
				                  <button class="btn btn-danger" 
                          //</td>onclick="DeleteUser('.$purchaseid.')"
                          >Delete
                        </button></td>
                    </tr>
                    <tr>
                      <td className="text-center">2</td>
                      <td>P.Pavithra</td>
                      <td>20203022</td>
                      <td>02-09-2002</td>
                      <td className="text-center">II</td>
                      <td className="text-center">Commerce</td>
                      <td className="text-center">M.Com</td>
                      <td className="text-center">PG</td>
                      <td className="text-center">I</td>
                      <td className="text-center" >
                        <button class="btn btn-primary" 
                          //onclick="GetDetails('.$purchaseid.')"
                          >Edit</button>
                        </td>
                        <td>
				                  <button class="btn btn-danger" 
                          //</td>onclick="DeleteUser('.$purchaseid.')"
                          >Delete
                        </button></td>
                    </tr> */}
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

