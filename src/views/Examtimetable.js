import React,{useEffect,useState} from "react";
import {
  Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button, Input, ModalBody, ModalHeader, ModalFooter, Modal, Label, Form, FormGroup
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ExamDateService from "./Examtimetable/ExamDateService";
import UserService from "./Login/Userservice";
import DepartmentService from "./Department/DepartmentService";
import SubjectService from "./Subject/Subjectservice";

export default function Examtimetable() {

  const examDateState = {
    examDateId:null,
    date: "",
    foreNoonStartingTime:"",
    foreNoonEndingTime:"",
    afterNoonStartingTime:"",
    departmentId:"",
    afterNoonEndingTime:"",
  };

  const currentexamDateState = {
    currentexamDateId:null,
    currentdate: "",
    currentforeNoonStartingTime:"",
    currentforeNoonEndingTime:"",
    currentafterNoonStartingTime:"",
    currentdepartmentId:"",
    currentafterNoonEndingTime:"",
  };

  const [examDatevalue,setExamDate]=useState(examDateState);
  const[submitted,setSubmitted]=useState(false);
  const [examDatelist,setExamDatelist]=useState([]);
  const [currentexamDate,setcurrentExamDate]=useState(currentexamDateState);
  const [departmentlist,setDepartmentlist]=useState([]);

  useEffect(() => {
    retrieveExamDate();
    retrieveDepartment();
  }, []);

  const handleInputChange=event => {
    const{name,value}=event.target;
    setExamDate({...examDatevalue,[name]:value});
  };
  const currenthandleInputChange=event => {
    const{name,value}=event.target;
    setcurrentExamDate({...currentexamDate,[name]:value});
  };
  const saveExamDate = (e) => {
    e.preventDefault();
    var data= {
        examDateId:examDatevalue.examDateId,
        date: examDatevalue.date,     
        foreNoonStartingTime:examDatevalue.foreNoonStartingTime,
        foreNoonEndingTime:examDatevalue.foreNoonEndingTime,
        afterNoonStartingTime:examDatevalue.afterNoonStartingTime,
        departmentId:examDatevalue.departmentId,
        afterNoonEndingTime:examDatevalue.afterNoonEndingTime,
    };
    // alert(data);
      ExamDateService.create(data).then(response => {
        alert("Success");
        setExamDate({
          examDateId: response.data.examDateId,
          date: response.data.date,
          foreNoonStartingTime:response.data.foreNoonStartingTime,
          foreNoonEndingTime:response.data.foreNoonEndingTime,
          afterNoonStartingTime:response.data.afterNoonStartingTime,
          departmentId:response.data.departmentId,
          afterNoonEndingTime:response.data.afterNoonEndingTime,
        });
        setSubmitted(true);
                console.log(response.data);
                retrieveExamDate();
                newExamDate();
      })
      .catch(e=>{
        alert(e);
        console.log(e);
      });
  };
  const newExamDate = () => {
    setExamDate(examDateState);
    setSubmitted(false);
  };
  const retrieveExamDate =() => {
      ExamDateService.getAll().then(response => {
      setExamDatelist(response.data);
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

  const updateExamDate = (e) => {
      e.preventDefault();
      var data= {
          examDateId: currentexamDate.currentexamDateId,
          date: currentexamDate.currentdate,
          foreNoonStartingTime:currentexamDate.currentforeNoonStartingTime,
          foreNoonEndingTime:currentexamDate.currentforeNoonEndingTime,
          afterNoonStartingTime:currentexamDate.currentafterNoonStartingTime,
          departmentId:currentexamDate.currentdepartmentId,
          afterNoonEndingTime:currentexamDate.currentafterNoonEndingTime,
      };
          // alert(data);
          ExamDateService.update(currentexamDate.currentexamDateId,data).
          then(response => {
          console.log(response.data);
          toggle1();
          alert("Success");
          retrieveExamDate();            
      })
          .catch(e => {
          console.log(e);
      });
  };
  const getExamDate = (id) => {
          ExamDateService.get(id).then(response => {
          setcurrentExamDate({
          currentexamDateId:response.data.examDateId,
          currentdate:response.data.date,
          currentforeNoonStartingTime:response.data.foreNoonStartingTime,
          currentforeNoonEndingTime:response.data.foreNoonEndingTime,
          currentafterNoonStartingTime:response.data.afterNoonStartingTime,
          currentdepartmentId:response.data.departmentId,
          currentafterNoonEndingTime:response.data.afterNoonEndingTime,
      });
      // console.log(response.data);
      })
      .catch(e => {
          console.log(e);
  });

  };
  const deleteExamDate = (id) => {
      ExamDateService.remove(id). then (
      response => {
          alert('Deleted Successfully...');           
      retrieveExamDate();           
  })
  UserService.getAll().then((response)=>{
      response.data.filter(obj=>obj.examDateId === id).map((val)=>
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
                <CardTitle tag="h4">Exam Details</CardTitle>
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
                        toggle={toggle}>Add Exam Date</ModalHeader>
                        <ModalBody>
                        <Form onSubmit={saveExamDate}>
                            <Row>
                                <Col>
                                    <FormGroup>
                                    <Label>Date</Label>
                                    <Input
                                        name="date"
                                        onChange={handleInputChange}
                                        value={examDatevalue.date}
                                        placeholder="DD-MM-YYYY"
                                        type="text" required
                                    />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                    <Label>FN Starting Time</Label>
                                    <Input
                                        name="foreNoonStartingTime"
                                        onChange={handleInputChange}
                                        value={examDatevalue.foreNoonStartingTime}
                                        placeholder="hours:min AM"
                                        type="text" required
                                    />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                    <Label>FN Ending Time</Label>
                                    <Input
                                        name="foreNoonEndingTime"
                                        onChange={handleInputChange}
                                        value={examDatevalue.foreNoonEndingTime}
                                        placeholder="hours:min AM"
                                        type="text" required
                                    />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                    <Label>AN Starting Time</Label>
                                    <Input
                                        name="afterNoonStartingTime"
                                        onChange={handleInputChange}
                                        value={examDatevalue.afterNoonStartingTime}
                                        placeholder="hours:min PM"
                                        type="text" required
                                    />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                    <Label>AN Ending Time</Label>
                                    <Input
                                        name="afterNoonEndingTime"
                                        onChange={handleInputChange}
                                        value={examDatevalue.afterNoonEndingTime}
                                        placeholder="hours:min PM"
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
                {/* <Button href="/Building/Add" onClick={()=>history.push("/add")} >
                  Add <i class="nc-icon nc-simple-add"></i>
                </Button>  */}
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>ForeNoon Exams</th>
                      <th>AfterNoon Exams</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    examDatelist.map(result=>(   
                      <tr>
                        <td>{i++}</td>
                        <td>{result.date}</td>
                        <td></td>
                        <td></td>
                        <td>                                            
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <i class="fa-solid fa-trash fa-lg" onClick={(e) => { if (window.confirm('Are you sure! Do you want to delete this exam detail?')) deleteExamDate(result.examDateId) } } ></i>
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
