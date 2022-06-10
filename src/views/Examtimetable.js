import React,{useEffect,useState} from "react";
import {
  Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button, Input, ModalBody, ModalHeader, ModalFooter, Modal, Label, Form, FormGroup
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ExamDateService from "./Examtimetable/ExamDateService";
// import UserService from "./Login/Userservice";
// import DepartmentService from "./Department/DepartmentService";
import SubjectService from "./Subject/Subjectservice";
import ExamDateAndTimeService from "./Examtimetable/ExamDateAndTimeService";

export default function Examtimetable() {

  const examDateState = {
    examDateId:null,
    date: "",
    foreNoonStartingTime:"",
    foreNoonEndingTime:"",
    afterNoonStartingTime:"",
    // departmentId:"",
    afterNoonEndingTime:"",
  };
  const examDateAndTimeState = {
    examDateAndTimeId:null,
    examDateId:null,
    // departmentId:"",
    examNoonType:"",
    subjectId:"",
  };
  const examDateAndTimeState1 = {
    examDateAndTimeId:null,
    examDateId:null,
    // departmentId:"",
    examNoonType:"",
    subjectId:"",
  };

  const [examDatevalue,setExamDate]=useState(examDateState);
  const[submitted,setSubmitted]=useState(false);
  const [examDatelist,setExamDatelist]=useState([]);
  // const [departmentlist,setDepartmentlist]=useState([]);

  const [examDateAndTimevalue,setExamDateAndTime]=useState(examDateAndTimeState);
  const [examDateAndTimevalue1,setExamDateAndTime1]=useState(examDateAndTimeState1);
  const [examDateAndTimelist,setExamDateAndTimelist]=useState([]);
  const [examDateAndTimelist1,setExamDateAndTimelist1]=useState([]);
  const [subjectlist,setSubjectlist] = useState([]);

  useEffect(() => {
    retrieveExamDate();
    // retrieveDepartment();
    retrieveSubject();
    retrieveExamDateAndTime();
    retrieveExamDateAndTime1();
  }, []);

  const handleInputChange=event => {
    const{name,value}=event.target;
    setExamDate({...examDatevalue,[name]:value});
  };
  const handleInputChange1=event => {
    const{name,value}=event.target;
    setExamDateAndTime({...examDateAndTimevalue,[name]:value});
  };
  const handleInputChange2=event => {
    const{name,value}=event.target;
    setExamDateAndTime1({...examDateAndTimevalue1,[name]:value});
  };
  const saveExamDate = (e) => {
    e.preventDefault();
    for (var i = 1; i <= 2; i++) {
      let noon='';
      var data;
      if(i==1){
        noon="ForeNoon";
        data= {
          examDateId:examDatevalue.examDateId,
          date: examDatevalue.date,  
          examNoonType:noon,   
          foreNoonStartingTime:examDatevalue.foreNoonStartingTime,
          foreNoonEndingTime:examDatevalue.foreNoonEndingTime,
          //afterNoonStartingTime:examDatevalue.afterNoonStartingTime,
          // departmentId:examDatevalue.departmentId,
          //afterNoonEndingTime:examDatevalue.afterNoonEndingTime,
      };
      }else{
        noon="AfterNoon";
        data= {
          examDateId:examDatevalue.examDateId,
          date: examDatevalue.date,  
          examNoonType:noon,   
          //foreNoonStartingTime:examDatevalue.foreNoonStartingTime,
          //foreNoonEndingTime:examDatevalue.foreNoonEndingTime,
          afterNoonStartingTime:examDatevalue.afterNoonStartingTime,
          // departmentId:examDatevalue.departmentId,
          afterNoonEndingTime:examDatevalue.afterNoonEndingTime,
      };
      }
    
    // alert(data);
      ExamDateService.create(data).then(response => {
        alert("Success");
        setExamDate({
          examDateId: response.data.examDateId,
          date: response.data.date,
          foreNoonStartingTime:response.data.foreNoonStartingTime,
          foreNoonEndingTime:response.data.foreNoonEndingTime,
          afterNoonStartingTime:response.data.afterNoonStartingTime,
          // departmentId:response.data.departmentId,
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
    }
  };

  const saveExamDateAndTime = (e) => {
    e.preventDefault();
    
    var data= {
        examDateId:examDateAndTimevalue.examDateId,
        examDateAndTimeId:examDateAndTimevalue.examDateAndTimeId,
        // departmentId:examDateAndTimevalue.departmentId,
        examNoonType:examDateAndTimevalue.examNoonType,
        subjectId:examDateAndTimevalue.subjectId,
    };
    alert(data);
    console.log("data",data);
      ExamDateAndTimeService.create(data).then(response => {
        alert("Success");
        setExamDateAndTime({
          examDateAndTimeId: response.data.examDateAndTimeId,
          // departmentId:response.data.departmentId,
          examNoonType: response.data.examNoonType,
          subjectId: response.data.subjectId,
          examDateId:response.data.examDateId
        });
        setSubmitted(true);
          console.log(response.data);
          retrieveExamDateAndTime();
          newExamDateAndTime();
      })
      .catch(e=>{
        alert(e);
        console.log(e);
      });
  };

  const saveExamDateAndTime1 = (e) => {
    e.preventDefault();
    var data= {
        examDateId:examDateAndTimevalue1.examDateId,
        examDateAndTimeId:examDateAndTimevalue1.examDateAndTimeId,
        // departmentId:examDateAndTimevalue1.departmentId,
        examNoonType:examDateAndTimevalue1.examNoonType,
        subjectId:examDateAndTimevalue1.subjectId,
    };
    // alert(data);
      ExamDateAndTimeService.create(data).then(response => {
        alert("Success");
        setExamDateAndTime1({
          examDateAndTimeId: response.data.examDateAndTimeId,
          // departmentId:response.data.departmentId,
          examNoonType: response.data.examNoonType,
          subjectId: response.data.subjectId,
          examDateId:response.data.examDateId,
        });
        setSubmitted(true);
          console.log(response.data);
          retrieveExamDateAndTime();
          retrieveExamDateAndTime1();
          newExamDateAndTime1();
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
  const newExamDateAndTime = () => {
    setExamDateAndTime(examDateAndTimeState);
    setSubmitted(false);
  }
  const newExamDateAndTime1 = () => {
    setExamDateAndTime1(examDateAndTimeState1);
    setSubmitted(false);
  }
  const retrieveExamDate =() => {
    ExamDateService.getAll().then(response => {
    setExamDatelist(response.data);
      // console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };

  const retrieveExamDateAndTime =() => {
    ExamDateAndTimeService.getAll().then(response => {
    setExamDateAndTimelist(response.data);
      // console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };
  const retrieveExamDateAndTime1 =() => {
    ExamDateAndTimeService.getAll().then(response => {
    setExamDateAndTimelist1(response.data);
      // console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };
  // const retrieveDepartment =() => {
  //   DepartmentService.getAll().then(response => {
  //   setDepartmentlist(response.data);
  //   // console.log(response.data);
  //   })
  //   .catch(e => {
  //     console.log(e);
  //   });
  // };

  const retrieveSubject =() => {
    SubjectService.getAll().then(response => {
    setSubjectlist(response.data);
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
    // UserService.getAll().then((response)=>{
    //   response.data.filter(obj=>obj.examDateId === id).map((val)=>
    //   UserService.remove(val.userId) .then (
    //       response => {}
    //   )
    //   )
    // })   
    .catch(e => {
      console.log(e);
    });
  };

  const deleteExamDateAndTime = (id) => {
    // alert(id);
    ExamDateAndTimeService.remove(id). then (
      response => {
        alert('Deleted Successfully...');           
        retrieveExamDateAndTime();           
      })
    // UserService.getAll().then((response)=>{
    //   response.data.filter(obj=>obj.examDateAndTimeId === id).map((val)=>
    //   UserService.remove(val.userId) .then (
    //       response => {}
    //   )
    //   )
    // })   
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
  let [ssexamDateId,setexamDateId] = React.useState(0);
  // Toggle for Modal
  const toggle1 = () => {
    //alert(id)
    setModal1(!modal1);
    // setexamDateId(id);
    //setExamDateAndTime({...examDateAndTimevalue,[examDateAndTimevalue.examDateId]:id});
    //alert(examDateId);
    // console.log("examDateId",ssexamDateId);
    
  }

  const [modal2, setModal2] = React.useState(false);
  
  const toggle2 = () => setModal2(!modal2);

  const [modal3,setModal3] = useState(false);
  const toggle3 = () => setModal3(!modal3);

  const [modal4,setModal4] = useState(false);
  const toggle4 = () => setModal4(!modal4);

  function getNumberofFNExams (id){
    return examDateAndTimelist.filter(obj=>obj.examDateId === id && obj.examNoonType ==="ForeNoon").length
  }
  function getNumberofANExams (id){
    return examDateAndTimelist.filter(obj=>obj.examDateId === id && obj.examNoonType ==="AfterNoon").length
  }
const [getdate,setdate] = useState();
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
                        toggle={toggle} fade={false} >
                        {/* modalTransition={{ timeout: 2000 }} */}
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
                      <th><center>#</center></th>
                      <th><center>Date</center></th>
                      <th><center>ForeNoon Exams
                        <tr>
                          <td>
                            <i class="fa-solid fa-plus fa-lg" onClick={()=>{toggle1();}}></i>
                            <Modal isOpen={modal1} 
                              toggle={toggle1} backdrop={false} >
                              <ModalHeader toggle={toggle1}>Add {examDateAndTimevalue.examNoonType = "ForeNoon"} Exam</ModalHeader>
                                <ModalBody>
                                  <Form onSubmit={(e) => saveExamDateAndTime(e)}>
                                    <Row>
                                      <Col>
                                        <FormGroup>
                                          <Label>Exam Date</Label>                                      
                                          <Input
                                            type={"select"}
                                            name="examDateId"
                                            onChange={handleInputChange1}
                                            value={examDateAndTimevalue.examDateId}
                                          ><option defaultValue="--------"></option>
                                            {examDatelist.filter(val=>val.examNoonType === 'ForeNoon').map(ob =>(
                                              <option value={ob.examDateId}>{ob.date}</option>
                                            ))}
                                          </Input>
                                        </FormGroup>
                                        {/* <FormGroup>
                                          <Label>Department</Label>
                                          <Input
                                            type={"select"}
                                            name="departmentId"
                                            onChange={handleInputChange1}
                                            value={examDateAndTimevalue.departmentId}
                                          ><option defaultValue="--------"></option>
                                            {departmentlist.map(result =>(
                                              <option value={result.departmentId}>{result.departmentName}</option>
                                            ))}
                                          </Input> */}
                                            {/* <Input
                                                name="departmentId"
                                                onChange={handleInputChange1}
                                                value={examDateAndTimevalue.departmentId}
                                                type="text" required
                                            /> */}
                                        {/* </FormGroup> */}
                                        <FormGroup>
                                          <Label>Subject</Label>
                                          <Input
                                            type={"select"}
                                            name="subjectId"
                                            onChange={handleInputChange1}
                                            value={examDateAndTimevalue.subjectId}
                                          ><option defaultValue="--------"></option>
                                            {subjectlist.map(result =>(
                                              // filter(obj =>Number(currentexamDateAndTime.currentdepartmentId) === Number(obj.departmentId))
                                              <option value={result.subjectId}>{result.subjectName}</option>
                                            ))}
                                          </Input>
                                        </FormGroup>
                                        <Button color="primary" type="submit" value="submit" onClick={toggle1}>Submit</Button>
                                      </Col>
                                    </Row>
                                  </Form>
                                </ModalBody>
                            </Modal>
                          </td>
                          <td>
                            <i class="fa-solid fa-eye fa-lg" onClick={()=>{toggle2();}}></i>
                            <Modal isOpen={modal2} toggle={toggle2} backdrop={false} >
                              <ModalHeader
                                toggle={toggle2}>Exam List</ModalHeader>
                              <ModalBody>
                                <Table responsive>
                                  <thead className="text-primary">
                                    <tr>
                                      <th>Subject</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {examDateAndTimelist
                                      .filter(ob =>(ob.examNoonType === "ForeNoon"))
                                      .map( result =>(
                                        <tr>
                                          <td>{subjectlist.filter(obj=> Number(obj.subjectId) === Number(result.subjectId)).map(res=>{
                                                return res.subjectName;})}
                                            {/* {subjectlist.map(res =>(res.subjectId === result.subjectId))} */}
                                          </td>
                                          <td>
                                          <i class="fa-solid fa-trash fa-lg" onClick={(e) => {if (window.confirm('Are You sure! Do you want to delete this subject ?')) deleteExamDateAndTime(result.examDateAndTimeId)}}></i>
                                          </td>
                                        </tr>
                                      ))
                                    }
                                  </tbody>
                                </Table>
                              </ModalBody>
                            </Modal>                  
                          </td>
                          <td> <i class="fa-solid fa-trash fa-lg" onClick={(e) => {if (window.confirm('Are You sure! Do you want to delete this exam time ?')) examDateAndTimelist.filter(ob =>(ob.examNoonType === "ForeNoon")).map(res =>(deleteExamDateAndTime(res.examDateAndTimeId))) }}></i> </td>
                        </tr>
                      </center></th>
                      <th><center>AfterNoon Exams
                        <tr>
                          <td>
                            <i class="fa-solid fa-plus fa-lg" onClick={()=>{toggle3();}}></i>
                            <Modal isOpen={modal3} 
                              toggle={toggle3} backdrop={false} >
                              <ModalHeader toggle={toggle3}>Add {examDateAndTimevalue1.examNoonType = "AfterNoon"} Exam</ModalHeader>
                                <ModalBody>
                                  <Form onSubmit={saveExamDateAndTime1}>
                                    <Row>
                                      <Col>
                                        <FormGroup>
                                          <Label>Exam Date</Label>
                                          <Input
                                            type={"select"}
                                            name="examDateId"
                                            onChange={handleInputChange2}
                                            value={examDateAndTimevalue1.examDateId}
                                          ><option defaultValue="--------"></option>
                                            {examDatelist.filter(val=>val.examNoonType === 'AfterNoon').map(ob =>(
                                              <option value={ob.examDateId}>{ob.date}</option>
                                             ))}
                                          </Input>
                                        </FormGroup>
                                        {/* <FormGroup>
                                          <Label>Department</Label>
                                          <Input
                                            type={"select"}
                                            name="departmentId"
                                            onChange={handleInputChange2}
                                            value={examDateAndTimevalue1.departmentId}
                                          ><option defaultValue="--------"></option>
                                            {departmentlist.map(result =>(
                                              <option value={result.departmentId}>{result.departmentName}</option>
                                            ))}
                                          </Input> */}
                                            {/* <Input
                                                name="departmentId"
                                                onChange={handleInputChange1}
                                                value={examDateAndTimevalue.departmentId}
                                                type="text" required
                                            /> */}
                                        {/* </FormGroup> */}
                                        <FormGroup>
                                          <Label>Subject</Label>
                                          <Input
                                            type={"select"}
                                            name="subjectId"
                                            onChange={handleInputChange2}
                                            value={examDateAndTimevalue1.subjectId}
                                          ><option defaultValue="--------"></option>
                                            {subjectlist.map(result =>(
                                              <option value={result.subjectId}>{result.subjectName}</option>
                                            ))}
                                          </Input>
                                        </FormGroup>
                                        <Button color="primary" type="submit" value="submit" onClick={toggle3}>Submit</Button>
                                      </Col>
                                    </Row>
                                  </Form>
                                </ModalBody>
                            </Modal>
                          </td>
                          <td>
                            <i class="fa-solid fa-eye fa-lg" onClick={()=>{toggle4();}}></i>
                            <Modal isOpen={modal4} toggle={toggle4} backdrop={false} >
                              <ModalHeader
                                toggle={toggle4}>Exam List</ModalHeader>
                              <ModalBody>
                                <Table responsive>
                                  <thead className="text-primary">
                                    <tr>
                                      <th>Subject</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {examDateAndTimelist1
                                      .filter(ob =>(ob.examNoonType === "AfterNoon" ))
                                      .map( result1 =>(
                                        <tr>
                                          <td>{subjectlist.filter(obj=> Number(obj.subjectId) === Number(result1.subjectId)).map(res=>{
                                                return res.subjectName;})}
                                            {/* {subjectlist.map(res =>(res.subjectId === result.subjectId))} */}
                                          </td>
                                          <td>
                                          <i class="fa-solid fa-trash fa-lg" onClick={(e) => {if (window.confirm('Are You sure! Do you want to delete this subject ?')) deleteExamDateAndTime(result1.examDateAndTimeId)}}></i>
                                          </td>
                                        </tr>
                                      ))
                                    }
                                  </tbody>
                                </Table>
                              </ModalBody>
                            </Modal>                  
                          </td>
                          <td> <i class="fa-solid fa-trash fa-lg" onClick={(e) => {if (window.confirm('Are You sure! Do you want to delete this exam time ?')) examDateAndTimelist.filter(ob=>( ob.examNoonType === "AfterNoon")).map(res =>(deleteExamDateAndTime(res.examDateAndTimeId))) }}></i> </td>
                        </tr>
                      </center></th>
                      <th><center>Action</center></th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    examDatelist.map(result=>(   
                      <tr>
                        <td>{i++}</td>
                        <td>{result.date}</td>
                        {/* { examDateAndTimelist.map(result =>( */}
                        {result.examNoonType === 'ForeNoon' ?
                        <td><center>{getNumberofFNExams(result.examDateId)} 
                          <td> <i class="fa-solid fa-trash fa-lg" onClick={(e) => {if (window.confirm('Are You sure! Do you want to delete this exam time ?')) examDateAndTimelist.filter(ob =>(ob.examDateId === result.examDateId && ob.examNoonType === "ForeNoon")).map(res =>(deleteExamDateAndTime(res.examDateAndTimeId))) }}></i> </td></center>
                        </td>:<td></td>
                        }
                        {result.examNoonType === 'AfterNoon' ?
                        <td><center>{getNumberofANExams(result.examDateId)}
                          <td> <i class="fa-solid fa-trash fa-lg" onClick={(e) => {if (window.confirm('Are You sure! Do you want to delete this exam time ?')) examDateAndTimelist.filter(ob=>(ob.examDateId === result.examDateId && ob.examNoonType === "AfterNoon")).map(res =>(deleteExamDateAndTime(res.examDateAndTimeId))) }}></i> </td></center>
                        </td>:<td></td>
                        }
                        <td><center>                                            
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <i class="fa-solid fa-trash fa-lg" onClick={(e) => { if (window.confirm('Are you sure! Do you want to delete this exam detail ?')) deleteExamDate(result.examDateId) } } ></i></center>
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
