import React, { useEffect } from "react";
import {
  Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button, Input,
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link } from "react-router-dom";
import BuildingService from "./Building/Buildingservice";
import RoomService from "./Room/Roomservice";
import DepartmentService from "./Department/DepartmentService";
import StudentService from "./Student/Studentservice";
import StaffService from "./Staff/Staffservice";
import SubjectService from "./Subject/Subjectservice";
import ExamDateService from "./Examtimetable/ExamDateService";
import ExamDateAndTimeService from "./Examtimetable/ExamDateAndTimeService";
import GenerateService from "./Generate/GenerateService";
import SubjectPlanService from "./Generate/SubjectPlanService";
import StudentPlanService from "./Generate/StudentPlanService";
import RoomPlanService from "./Generate/RoomPlanService";
import StaffPlanService from "./Generate/StaffPlanService";

export default function Generate() {

  const [jsonbuilding,setjsonbuilding]=React.useState([]);
  const [jsonroom,setjsonroom]=React.useState([]);
  const [jsonstaff,setjsonstaff]=React.useState([]);
  const [jsonsubject,setjsonsubject]=React.useState([]);
  const [jsonstudent,setjsonstudent]=React.useState([]);
  const [jsonexamdate,setjsonexamdate]=React.useState([]);
  const [jsonexamdateandtime,setjsonexamdateandtime]=React.useState([]);
  const [resdata,setresponsedata]=React.useState({});
  const [examDatelist,setExamDatelist]=React.useState([]);
  const [subjectlist,setSubjectlist]=React.useState([]);
  const [subjectPlanlist,setSubjectPlanlist]=React.useState([]);
  const [roomPlanlist,setRoomPlanlist]=React.useState([]);
  const [staffPlanlist,setStaffPlanlist]=React.useState([]);
  const [studentPlanlist,setStudentPlanlist]=React.useState([]);
  const [resultavailable,setresultavailable]=React.useState(false);

  const [studentvisible,setStudentVisible]=React.useState(false);
  const [staffvisible,setStaffVisible]=React.useState(false);
  const [roomvisible,setRoomVisible]=React.useState(false);
  const [subjectvisible,setSubjectVisible]=React.useState(false);
  const [show, setShow]=React.useState(false);
  const [show1, setShow1]=React.useState(true);
  const[submitted,setSubmitted]=React.useState(false);
  const [subjectPlanvalue,setSubjectPlan]=React.useState([]);
  const [studentPlanvalue,setStudentPlan]=React.useState([]);
  const [staffPlanvalue,setStaffPlan]=React.useState([]);
  const [roomPlanvalue,setRoomPlan]=React.useState([]);

  useEffect(()=>{
    setjsonbuilding([]);
    setjsonexamdate([]);
    setjsonexamdateandtime([]);
    setjsonroom([]);
    setjsonstaff([]);
    setjsonstudent([]);
    setjsonsubject([]);
    retrieveExamDate();
    retrieveSubject();
    retrieveStudentPlan();
    retrieveSubjectPlan();
    retrieveRoomPlan();
    BuildingService.getAll().then(response => {
                
      response.data.map(obj=>{
          setjsonbuilding(jsonbuilding=>[...jsonbuilding,{
          "buildingId":obj.buildingId,
          "buildingName":obj.buildingName
          }]);
      })
      // console.log("jsonbuilding",response.data)
    })
    RoomService.getAll().then(response => {
      response.data.map(obj=>{
          setjsonroom(jsonroom=>[...jsonroom,{
          "roomId":obj.roomId,
          "roomName":obj.roomName,
          "buildingId":obj.buildingId,
          "examSeatingCapacity":obj.seatCapacity,
          }]);
      })
      // console.log("jsonroom",response.data)
    })
    SubjectService.getAll().then(response=>{
      response.data.map(obj=>{
        setjsonsubject(jsonsubject=>[...jsonsubject,{
          "subjectId":obj.subjectId,
          "subjectCode":obj.courseCode,
          "subjectName":obj.subjectName,
        }])
      })
    })
    StudentService.getAll().then(response=>{
      response.data.map(obj=>{
        setjsonstudent(jsonstudent=>[...jsonstudent,{
          "studentId":obj.studentId,
          "studentRollNumber":obj.rollNo,
          "studentName":obj.studentName,
        }])
      })
    })
    StaffService.getAll().then(response=>{
      response.data.map(obj=>{
        setjsonstaff(jsonstaff=>[...jsonstaff,{
          "staffId":obj.staffId,
          "staffName":obj.staffName,
        }])
      })
    })
    ExamDateService.getAll().then(response=>{
      response.data.map(obj=>{
        if(obj.examNoonType === "ForeNoon")
        {
          setjsonexamdate(jsonexamdate=>[...jsonexamdate,{
            "examDateAndTimeId": obj.examDateId,
            "examDate": obj.date,
            "examStartTime": obj.foreNoonStartingTime,
            "examEndTime": obj.foreNoonEndingTime,          
          }])            
        }else{
          setjsonexamdate(jsonexamdate=>[...jsonexamdate,{
            "examDateAndTimeId": obj.examDateId,
            "examDate": obj.date,
            "examStartTime": obj.afterNoonStartingTime,
            "examEndTime": obj.afterNoonEndingTime,
          }])
        } 
      })
    })
    ExamDateAndTimeService.getAll().then(response=>{
      response.data.map(obj=>{
        setjsonexamdateandtime(jsonexamdateandtime=>[...jsonexamdateandtime,{
          "subjectId":obj.subjectId,
          "examDateAndTimeId":obj.examDateId,
          "studentIds":getStudentList(obj.subjectId)
        }])
      })
    })
  },[])
  const getStudentList =(subId) =>{
    let deptId;
    let semester;
    let stuArray=[];
    SubjectService.getAll().then(response=>{
      response.data.filter(val=>val.subjectId === Number(subId)).map(obj=>{
        // alert(obj.department)
        // alert(obj.semester)
       deptId=obj.department;
       semester=obj.semester;
      })
      StudentService.getAll().then(response=>{
        response.data.map(obj=>{
          if(Number(obj.departmentId) === Number(deptId) && obj.semester === semester){
            // alert(obj.studentId);
            stuArray.push(obj.studentId);
          }         
        })
      })
    })
   
    return stuArray;
  }
  const algorithm =(e)=>{
    const data = {
      buildings:jsonbuilding,
      rooms:jsonroom,
      subjects:jsonsubject,
      staff:jsonstaff,
      students:jsonstudent,
      examDateAndTimes:jsonexamdate,
      examTimetable:jsonexamdateandtime
    };
    GenerateService.create(data)
      .then(response => {
        //setresultavailable(true);
        setresponsedata(response.data);        
        setresponsedata(response.data)
        console.log("response",resdata)         
    })
        //.then(({ data: resdata }) => {
          
        // if (response.status===200){            
        //                                                                           
        // }
        // else if(response.status === 500){
        //     alert(response.data)
           
        // } 
        // else if(response.status === 406){
        //     alert("Unrecognized Input = " + response.data)
            
        // }                
    setShow(true);
    { (subjectPlanlist.length > 0)? setShow1(false):setShow1(true)}
  };

  const exportdata=()=>{
    
  const res = {
    buildings:jsonbuilding,
    rooms:jsonroom,
    subjects:jsonsubject,
    staff:jsonstaff,
    students:jsonstudent,
    examDateAndTimes:jsonexamdate,
    examTimetable:jsonexamdateandtime
}

const element = document.createElement("a");
const file = new Blob([JSON.stringify(res)], 
  {type: 'text/plain;charset=utf-8'});
element.href = URL.createObjectURL(file);
element.download = "myFile.json";
document.body.appendChild(element);
element.click();
  }

  let i=1;

  const retrieveExamDate =() => {
    ExamDateService.getAll().then(response => {
    setExamDatelist(response.data);
      // console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
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
  const retrieveSubjectPlan =() => {
    SubjectPlanService.getAll().then(response => {
      setSubjectPlanlist(response.data);
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
  const retrieveStaffPlan =() => {
    StaffPlanService.getAll().then(response => {
      setStaffPlanlist(response.data);
    // console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };
  const retrieveRoomPlan =() => {
    RoomPlanService.getAll().then(response => {
      setRoomPlanlist(response.data);
    // console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };
  const getdate=(id)=>{
    return examDatelist.filter(obj=>( Number(obj.examDateId) === Number(id)).map(ob=>{
      return ob.date;
    })
    )
  }
  const getsubjectName=(id)=>{
    return subjectlist.filter(obj=>( Number(obj.subjectId) === Number(id)).map(ob=>{
      return ob.subjectName;
    })
    )
  }
  // const getRoomName=(id)=>{
  //   return roomlist.filter(obj=>( Number(obj.roomId) === Number(id)).map(ob=>{
  //     return ob.roomName;
  //   })
  //   )
  // }
  const viewResult = (e) =>{
    if(e.target.value === 'student'){
      setStudentVisible(true);
      setStaffVisible(false);
      setRoomVisible(false);
      setSubjectVisible(false);
    }
    else if(e.target.value === 'staff'){
      setStudentVisible(false);
      setStaffVisible(true);
      setRoomVisible(false);
      setSubjectVisible(false);

    }
    else if(e.target.value === 'room'){
      setStudentVisible(false);
      setStaffVisible(false);
      setRoomVisible(true);
      setSubjectVisible(false);

    }
    else if(e.target.value === 'subject'){
      setStudentVisible(false);
      setStaffVisible(false);
      setRoomVisible(false);
      setSubjectVisible(true);

    }
    setresultavailable(true);
  }

  const saveplan = () => {
    resdata.studentPlan.map(res =>{
      var data= {
        studentId:res.studentId,
        studentName: res.studentName,        
        schedule: JSON.stringify(res.schedule),     
      };
      StudentPlanService.create(data).then(response => {
        // alert("Success");
        setStudentPlan({
          studentId: response.data.studentId,
          studentName: response.data.studentName,
          schedule: response.data.schedule,
        });
        retrieveStudentPlan();
        setSubmitted(true);
        console.log(response.data);
        // newBuilding();
      })
      .catch(e=>{
        alert(e);
        console.log(e);
      });
    })
    resdata.staffPlan.map(res =>{
      var data= {
        staffId:res.staffId,
        staffName: res.staffName,        
        schedule: JSON.stringify(res.schedule),     
      };
      StaffPlanService.create(data).then(response => {
        // alert("Success");
        setStaffPlan({
          staffId: response.data.staffId,
          staffName: response.data.staffName,
          schedule: response.data.schedule,
        });
        retrieveStaffPlan();
        setSubmitted(true);
        console.log(response.data);
        // newBuilding();
      })
      .catch(e=>{
        alert(e);
        console.log(e);
      });
    }) 
    resdata.roomPlan.map(res =>{
      var data= {
        roomId:res.roomId,
        roomName: res.roomName,        
        schedule: JSON.stringify(res.schedule),     
      };
      RoomPlanService.create(data).then(response => {
        // alert("Success");
        setRoomPlan({
          roomId: response.data.roomId,
          roomName: response.data.roomName,
          schedule: response.data.schedule,
        });
        retrieveSubjectPlan();
        setSubmitted(true);
        console.log(response.data);
        // newBuilding();
      })
      .catch(e=>{
        alert(e);
        console.log(e);
      });
    }) 
    resdata.subjectPlan.map(res =>{
      var data= {
        subjectId:res.subjectId,
        subjectName: res.subjectName,
        examDateAndTimeId: res.examDateAndTimeId,
        summary: JSON.stringify(res.summary),     
      };
      SubjectPlanService.create(data).then(response => {
        // alert("Success");
        setSubjectPlan({
          subjectId: response.data.subjectId,
          subjectName: response.data.subjectName,
          examDateAndTimeId: response.data.examDateAndTimeId,
          summary:response.data.summary,
        });
        retrieveSubjectPlan();
        setSubmitted(true);
        console.log(response.data);
        // newBuilding();
      })
      .catch(e=>{
        alert(e);
        console.log(e);
      });
    })
    alert("Success");   
    // if((studentPlanlist.length > 0) && (staffPlanlist.length > 0) && (roomPlanlist.length > 0) && (subjectPlanlist.length > 0))
    // {
    //   alert("Success");
    // } 
  };

  const deletePlan = () => {
    StaffPlanService.deleteall(). then (
    response => {
        alert('Deleted Successfully...');           
        retrieveStaffPlan();           
    })
    // UserService.getAll().then((response)=>{
    //     response.data.filter(obj=>obj.buildingId === id).map((val)=>
    //     UserService.remove(val.userId) .then (
    //         response => {}
    //     )
    //     )
    // })   
    .catch(e => {
      console.log(e);
    });
  };

  const setResetValue=()=>{
    i=1;
  }

  return (
    <>
      <div className="content">
      <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Report Generation</CardTitle>
                <Col><Table><tr>
                  <td>
                    <Button color="success" 
                      onClick={()=>{exportdata();}}
                    ><i class="fa-solid fa-download"></i> Export</Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button color="primary" 
                      onClick={()=>{algorithm();}}
                    ><i class="fa-solid fa-diagram-successor"></i> Run Algorithm
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  {/* </td>
                  {subjectPlanlist.map(ob=>{
                  <td> */}
                    {show1 ? 
                      <Button color="success" 
                        onClick={()=>{saveplan();}}
                      ><i class="fa-solid fa-file-circle-plus"></i> Save
                      </Button> :
                      <Button color="danger" 
                        onClick={()=>{deletePlan();}}
                      ><i class="fa-solid fa-file-circle-minus"></i> Delete
                      </Button>
                    }
                  </td>
                  {/* })} */}
                  </tr></Table>
                </Col>
              </CardHeader>
              <CardBody>
                {show ? 
                  <Col md = "4">
                    <Input 
                      type={"select"}
                      onChange={viewResult}
                    >
                      <option defaultValue="" >Select Category</option>
                      <option value="student">Student</option>
                      <option value="staff">Staff</option>
                      <option value="room">Room</option>
                      <option value="subject">Subject</option>
                    </Input>
                  </Col>
                 : null}
                { studentvisible && <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Student Name</th>
                      <th>Roll No</th>
                      <th>Subject Name</th>
                      <th>Exam Time</th>
                      <th>Block Name</th>
                      <th>Hall No</th>
                      <th>Seat No</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {resultavailable && resdata.studentPlan.length} */}
                    {resultavailable && resdata.studentPlan.map(result=>(
                    <tr>
                      <td>{i++}</td>
                      <td>{result.studentName}</td>
                      <td>{result.schedule.map(res=>(
                        <li>{getdate(Number(res.examDateAndTimeId))}</li>
                      ))}</td>                      
                      <td>{}</td>
                    </tr>
                     ))} 
                  </tbody>
                </Table> }
                { staffvisible && <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Staff Name</th>                  
                    </tr>
                  </thead>
                  <tbody>
                    {/* {resultavailable && resdata.studentPlan.length} */}
                    {resultavailable && resdata.staffPlan.map(result=>(
                    <tr>
                      <td>{i++}</td>
                      <td>{result.staffName}</td>
                    </tr>
                     ))} 
                  </tbody>
                </Table> }
                { roomvisible && 
                resdata.roomPlan.map(res =>(
                  <div>
                  <p>{res.roomName}</p>                                 
                  { res.schedule.length > 0 && <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Subject Name</th>
                      <th>Number of Students</th>                  
                    </tr>
                  </thead>
                  <tbody>
                    {/* {resultavailable && resdata.studentPlan.length} */}
                    {res.schedule.map(result=>(                    
                      result.summary.map(obj=>(
                        <tr>
                        <td>{i++}</td>                  
                        <td>{result.examDateAndTimeId}</td>
                        <td>{getsubjectName(obj.subjectId)}</td>
                        <td>{obj.numberOfStudents}</td>
                        </tr>
                      ))                                       
                     ))} 
                  </tbody>
                </Table> }
                 { res.schedule.length > 0 && 
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>#</th>
                      <th>RollNo</th>
                      <th>Subject Name</th>
                      <th>Seat Number</th>                  
                    </tr>
                  </thead>
                  <tbody>                    
                    {res.schedule.map(result=>(                  
                          result.students.map(obj=>(
                            <tr>
                              <td>{i++}</td>
                              <td>{obj.studentId}</td>
                              <td>{getsubjectName(obj.subjectId)}</td>
                              <td>{obj.seatNumber}</td>
                              </tr>
                          ))                                                                                   
                     ))} 
                  </tbody>
                </Table> }
                </div>
                  
                 ))}

                { subjectvisible && 
                resdata.subjectPlan.map(res =>(
                  <div>
                  <p>{res.subjectName}</p>
                  <p>{res.examDateAndTimeId}</p>               
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>#</th>
                      <th>Room Name</th>
                      <th>Number of Students</th>                  
                    </tr>
                  </thead>
                  <tbody>
                    {/* {resultavailable && resdata.studentPlan.length} */}
                    {res.summary.map(result=>(
                    <tr>
                      <td>{i++}</td>
                      {/* <td>{getRoomName(result.roomId)}</td> */}
                      <td>{result.numberOfStudents}</td>
                    </tr>
                     ))} 
                  </tbody>
                </Table></div>
                  
                 ))}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
