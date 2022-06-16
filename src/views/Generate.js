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

  const [savestudentvisible,setSaveStudentVisible]=React.useState(false);
  const [savestaffvisible,setSaveStaffVisible]=React.useState(false);
  const [saveroomvisible,setSaveRoomVisible]=React.useState(false);
  const [savesubjectvisible,setSaveSubjectVisible]=React.useState(false);

  const [show, setShow]=React.useState(false);
  const [show1, setShow1]=React.useState(true);
  const[submitted,setSubmitted]=React.useState(false);
  const [subjectPlanvalue,setSubjectPlan]=React.useState([]);
  const [studentPlanvalue,setStudentPlan]=React.useState([]);
  const [staffPlanvalue,setStaffPlan]=React.useState([]);
  const [roomPlanvalue,setRoomPlan]=React.useState([]);
  const [studentlist,setStudentlist]=React.useState([]);
  const [roomlist,setRoomlist]=React.useState([]);
  const [stafflist,setStafflist]=React.useState([]);
  const [buildinglist,setBuildinglist]=React.useState([]);

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
    retrieveStaff();
    retrieveRoom();
    retrieveBuilding();
    retrieveStudentPlan();
    retrieveSubjectPlan();  
    retrieveStaffPlan();
    retrieveRoomPlan();
    retrieveStudent();
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
    retrieveSubject();

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
     console.log("subject",subjectlist.length);
     console.log("subject",subjectlist);
    })
    .catch(e => {
      console.log(e);
    });
  };
  const retrieveRoom =() => {
    RoomService.getAll().then(response => {
      setRoomlist(response.data);     
    })
    .catch(e => {
      console.log(e);
    });
  };
  const retrieveBuilding =() => {
    BuildingService.getAll().then(response => {
      setBuildinglist(response.data);     
    })
    .catch(e => {
      console.log(e);
    });
  };
  const retrieveStaff =() => {
    StaffService.getAll().then(response => {
      setStafflist(response.data);     
    })
    .catch(e => {
      console.log(e);
    });
  };
  const retrieveStudent =() => {
    StudentService.getAll().then(response => {
      setStudentlist(response.data);     
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
  let getsubjectName=(id)=>{
    // return subjectlist.filter(obj=>( Number(obj.subjectId) === Number(id)).map(ob=>{
    //   return ob.subjectName;
    // })
    return Object.keys(subjectlist).filter(val=> subjectlist[val].subjectId === id).map(product => {
      return subjectlist[product].subjectName
     })
  }
let getexamdate=(id)=>{  
  return Object.keys(examDatelist).filter(val=> examDatelist[val].examDateId === id).map(product => {
    return examDatelist[product].date
  })
}
let getroomname=(id)=>{  
  return Object.keys(roomlist).filter(val=> roomlist[val].roomId === id).map(product => {
    return roomlist[product].roomName
  })
}
let getbuildingId=(id)=>{  
  return Object.keys(roomlist).filter(val=> roomlist[val].roomId === id).map(product => {
    return getbuildingName( roomlist[product].buildingId)
  })
}
let getbuildingName=(id)=>{  
  return Object.keys(buildinglist).filter(val=> buildinglist[val].buildingId === id).map(product => {
    return buildinglist[product].buildingName
  })
}
function printplan(){
  // deptname=getdeptname(resdeptid);
  // getname(getdeptname(resdeptid));
  
  var divContents = document.getElementById("printdiv").innerHTML;        
  var a = window.open('', '', 'height=500, width=500');
  a.document.write('<html>');
  a.document.write('<body > <center><h1>Report</h1></center><br>');
  // a.document.write('<h3>Campusplanner </h3><h4>powered by RootNode</h4><hr>');
  // a.document.write('<h2>' + deptname + '</h2></center>');
  a.document.write(divContents);
  a.document.write('</body></html>');
  a.document.close();
  a.print();
}
let getstuname=(id)=>{  
  return Object.keys(studentlist).filter(val=> studentlist[val].studentId === id).map(product => {
    return studentlist[product].studentName
  })
}
let getstaffname=(id)=>{  
  return Object.keys(stafflist).filter(val=> stafflist[val].staffId === id).map(product => {
    return stafflist[product].staffName
  })
}
let getstuid=(id)=>{  
  return Object.keys(studentlist).filter(val=> studentlist[val].studentId === id).map(product => {
    return studentlist[product].rollNo;
  })
}
let getnoontime=(id)=>{
  // console.log("Id",id);  
  return Object.keys(examDatelist).filter(ob=> examDatelist[ob].examDateId === id).map(product => {
    if (examDatelist[product].examNoonType === "ForeNoon"){
      var fns=examDatelist[product].foreNoonStartingTime ;
      var fne=examDatelist[product].foreNoonEndingTime;
      return `${fns} - ${fne}`;
    }
    if (examDatelist[product].examNoonType === "AfterNoon") {
      var ans=examDatelist[product].afterNoonStartingTime ;
      var ane=examDatelist[product].afterNoonEndingTime;
      return `${ans} - ${ane}`;
    }   
  })
}
  
  const viewResult = (e) =>{
    // alert(e.target.value)
    if(studentPlanlist.length === 0){      
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
      
  else{     
    if(e.target.value === 'student'){
      setSaveStudentVisible(true);
      setSaveStaffVisible(false);
      setSaveRoomVisible(false);
      setSaveSubjectVisible(false);
    }
    else if(e.target.value === 'staff'){
      setSaveStudentVisible(false);
      setSaveStaffVisible(true);
      setSaveRoomVisible(false);
      setSaveSubjectVisible(false);

    }
    else if(e.target.value === 'room'){
      setSaveStudentVisible(false);
      setSaveStaffVisible(false);
      setSaveRoomVisible(true);
      setSaveSubjectVisible(false);

    }
    else if(e.target.value === 'subject'){
      setSaveStudentVisible(false);
      setSaveStaffVisible(false);
      setSaveRoomVisible(false);
      setSaveSubjectVisible(true);

    }
    setresultavailable(true);
  }
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
                <Col><Table ><tr>
                  
                    {studentPlanlist.length === 0 ? 
                    <td>
                    <Button color="success" 
                      onClick={()=>{exportdata();}}
                    ><i class="fa-solid fa-download"></i> Export</Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button color="primary" 
                      onClick={()=>{algorithm();}}
                    ><i class="fa-solid fa-diagram-successor"></i> Run Algorithm
                    </Button> 
                    <Button color="success" 
                        onClick={()=>{saveplan();}}
                      ><i class="fa-solid fa-file-circle-plus"></i> Save
                      </Button> 
                    </td>  :
                    <td>                      
                      <Button color="danger" 
                        onClick={()=>{deletePlan();}}
                      ><i class="fa-solid fa-file-circle-minus"></i> Delete
                      </Button>  
                    </td>
                    }    
             
                 
                  {/* })} */}
                  </tr></Table>
                </Col>
              </CardHeader>
              <CardBody>
                 
                  <Col md = "6"><Table><tr>                                      
                    <td>
                    <Input 
                      type={"select"}
                      onChange={(e) => viewResult(e)}
                    >
                      <option defaultValue="" >Select Category</option>
                      <option value="student">Student</option>
                      <option value="staff">Staff</option>
                      <option value="room">Room</option>
                      <option value="subject">Subject</option>
                    </Input>                                        
                    </td></tr><tr><td>
                      <Button color="primary" 
                        onClick={()=>{printplan();}}
                      ><i class="fa-solid fa-print"></i> Print
                      </Button></td></tr></Table></Col>
                 
                {/* { studentvisible && <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      
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
                    {/* {resultavailable && resdata.studentPlan.length}
                    {resultavailable && resdata.studentPlan.map(result=>(
                    <tr>                      
                      <td>{result.studentName}</td>
                      <td>{result.schedule.map(res=>(
                        <li>{getexamdate((res.examDateAndTimeId))}</li>
                      ))}</td>                      
                      <td>{}</td>
                    </tr>
                     ))} 
                  </tbody>
                </Table> } */}
                <div id="printdiv">
                { studentvisible &&               
                resdata.studentPlan.map(res=>(                 
                  res.schedule.length > 0 &&
                  <div>
                    <heading><b>STUDENT NAME :</b> {res.studentName}</heading><br></br>
                    <Table bordered  responsive>
                      <thead className="text-primary">
                        <tr>
                          
                          <th>Date</th>
                          <th>Exam Time</th>
                          <th>Subject Name</th>
                          <th>Block Name</th>
                          <th>Room Name</th>  
                          <th>Seat Number</th>                                          
                        </tr>
                      </thead>
                      <tbody>
                        {/* {resultavailable && resdata.studentPlan.length} */}
                        {res.schedule.map(result=>(
                        <tr>
                          
                          <td>{getexamdate(result.examDateAndTimeId)}</td>
                          <td>{getnoontime(result.examDateAndTimeId)}</td>
                          <td>{getsubjectName(result.subjectId)}</td>
                          <td>{getbuildingId(result.roomId)}</td>
                          <td>{getroomname(result.roomId)}</td>
                          <td>{result.seatNumber}</td>
                        </tr>
                        ))} 
                      </tbody>
                    </Table>
                    <br></br><br></br><br></br><hr></hr></div> )) 
                }
                {
                  savestudentvisible && studentPlanlist.map(res=>(                 
                  res.schedule.length > 0 &&  
                  <div>                
                    <heading><b>STUDENT NAME :</b> {res.studentName}</heading><br></br>
                    <Table bordered  responsive>
                      <thead className="text-primary">
                        <tr>
                          
                          <th>Date</th>
                          <th>Exam Time</th>
                          <th>Subject Name</th>
                          <th>Block Name</th>
                          <th>Room Name</th>  
                          <th>Seat Number</th>                                          
                        </tr>
                      </thead>
                      <tbody>                       
                        {JSON.parse(res.schedule).map(result=>(
                        <tr>
                          
                          <td>{getexamdate(result.examDateAndTimeId)}</td>
                          <td>{getnoontime(result.examDateAndTimeId)}</td>
                          <td>{getsubjectName(result.subjectId)}</td>
                          <td>{getbuildingId(result.roomId)}</td>
                          <td>{getroomname(result.roomId)}</td>
                          <td>{result.seatNumber}</td>
                        </tr>
                        ))} 
                      </tbody>
                    </Table>
                    <br></br><br></br><br></br><hr></hr>
                </div>                                
                )) 
                }
              
                { staffvisible && 
                resdata.staffPlan.map(res=>(                 
                  res.schedule.length > 0 &&
                  <div>
                    <heading><b>STAFF NAME :</b> {res.staffName}</heading>
                    <Table striped bordered hover responsive>
                      <thead className="text-primary">
                        <tr>
                          
                          <th>Date</th>
                          <th>Room Id</th>  
                          <th>Exam Time</th>                
                        </tr>
                      </thead>
                      <tbody>
                        {/* {resultavailable && resdata.studentPlan.length} */}
                        {res.schedule.map(result=>(
                        <tr>
                          
                          <td>{getexamdate(result.examDateAndTimeId)}</td>
                          <td>{getroomname(result.roomId)}</td>
                          <td>{getnoontime(result.examDateAndTimeId)}</td>
                        </tr>
                        ))} 
                      </tbody>
                    </Table>
                </div>                                
                ))}
                {
                savestaffvisible && staffPlanlist.map(res=>(                 
                  res.schedule.length > 0 &&
                  <div>
                    <heading><b>STAFF NAME :</b> {res.staffName}</heading>
                    <Table striped bordered hover responsive>
                      <thead className="text-primary">
                        <tr>
                          
                          <th>Date</th>
                          <th>Room Id</th>  
                          <th>Exam Time</th>                
                        </tr>
                      </thead>
                      <tbody>
                        {/* {resultavailable && resdata.studentPlan.length} */}
                        {JSON.parse(res.schedule).map(result=>(
                        <tr>
                          
                          <td>{getexamdate(result.examDateAndTimeId)}</td>
                          <td>{getroomname(result.roomId)}</td>
                          <td>{getnoontime(result.examDateAndTimeId)}</td>
                        </tr>
                        ))} 
                      </tbody>
                    </Table>
                </div>                                
                ))
                }
                { roomvisible && 
                resdata.roomPlan.map(res =>(
                                                   
                  res.schedule.length > 0 && 
                    <div>
                  <heading><b>ROOM NAME :</b> {res.roomName}</heading>
                  {res.schedule.map(result=>( 
                    <div>                  
                  <heading><b>DATE :</b> {getexamdate(result.examDateAndTimeId)}</heading>
                  <div><heading><b>TIME :</b> {getnoontime(result.examDateAndTimeId)}</heading></div>
                  <div><heading><b>STAFF NAME :</b> {getstaffname(result.staffId)}</heading></div>
                  <Table striped bordered hover responsive>
                    <thead className="text-primary">
                      <tr>
                                                                        
                        <th>Subject Name</th>
                        <th>Number of Students</th>                
                      </tr>
                    </thead>
                    <tbody>
                      {/* {resultavailable && resdata.studentPlan.length} */}                                       
                        {result.summary.map(obj=>(
                          <tr>
                                                                      
                          <td>{getsubjectName(obj.subjectId)}</td> 
                          <td>{obj.numberOfStudents}</td>                       
                          </tr>
                        ))}                                                             
                    </tbody>
                  </Table>
                  <Table striped bordered hover responsive>
                  <thead className="text-primary">
                    <tr>
                                            
                      <th>Seat No</th>
                      <th>Roll No </th>
                      <th>Student Name</th>  
                      <th>Subject Name</th>                
                    </tr>
                  </thead>
                  <tbody>
                    {/* {resultavailable && resdata.studentPlan.length} */}                                       
                      {result.students.map(obj=>(
                        <tr>
                                          
                        <td>{obj.seatNumber}</td>
                        <td>{getstuid(obj.studentId)}</td>
                        <td>{getstuname(obj.studentId)}</td>
                        <td>{getsubjectName(obj.subjectId)}</td>                        
                        </tr>
                      ))}                                                             
                  </tbody>
                </Table></div> ))}                              
                </div>
                  
                 ))}
                 {saveroomvisible && 
                   roomPlanlist.map(res =>(
                                                   
                    res.schedule.length > 0 && 
                      <div>
                    <heading><b>ROOM NAME :</b> {res.roomName}</heading>
                    {JSON.parse(res.schedule).map(result=>( 
                      <div>                  
                    <heading><b>DATE :</b> {getexamdate(result.examDateAndTimeId)}</heading>
                    <div><heading><b>TIME :</b> {getnoontime(result.examDateAndTimeId)}</heading></div>
                    <div><heading><b>STAFF NAME :</b> {getstaffname(result.staffId)}</heading></div>
                    <Table striped bordered hover responsive>
                      <thead className="text-primary">
                        <tr>
                                                                          
                          <th>Subject Name</th>
                          <th>Number of Students</th>                
                        </tr>
                      </thead>
                      <tbody>
                        {/* {resultavailable && resdata.studentPlan.length} */}                                       
                          {result.summary.map(obj=>(
                            <tr>
                                                                        
                            <td>{getsubjectName(obj.subjectId)}</td> 
                            <td>{obj.numberOfStudents}</td>                       
                            </tr>
                          ))}                                                             
                      </tbody>
                    </Table>
                    <Table striped bordered hover responsive>
                    <thead className="text-primary">
                      <tr>
                                              
                        <th>Seat No</th>
                        <th>Roll No </th>
                        <th>Student Name</th>  
                        <th>Subject Name</th>                
                      </tr>
                    </thead>
                    <tbody>
                      {/* {resultavailable && resdata.studentPlan.length} */}                                       
                        {result.students.map(obj=>(
                          <tr>
                                            
                          <td>{obj.seatNumber}</td>
                          <td>{getstuid(obj.studentId)}</td>
                          <td>{getstuname(obj.studentId)}</td>
                          <td>{getsubjectName(obj.subjectId)}</td>                        
                          </tr>
                        ))}                                                             
                    </tbody></Table></div> ))}</div>
                    
                   )) 
                 }

                { subjectvisible && 
                resdata.subjectPlan.map(res =>(
                  <div>
                  <heading><b>SUBJECT NAME : </b>{res.subjectName}</heading>
                  <div><heading><b>DATE : </b>{getexamdate(res.examDateAndTimeId)}</heading></div>               
                  <div><heading><b>Time : </b>{getnoontime(res.examDateAndTimeId)}</heading></div>
                <Table striped bordered hover responsive>
                  <thead className="text-primary">
                    <tr>
                      
                      <th>Room Name</th>
                      <th>Number of Students</th>                  
                    </tr>
                  </thead>
                  <tbody>
                    {/* {resultavailable && resdata.studentPlan.length} */}
                    {res.summary.map(result=>(
                    <tr>
                      
                      <td>{getroomname(result.roomId)}</td>
                      <td>{result.numberOfStudents}</td>
                    </tr>
                     ))} 
                  </tbody>
                </Table></div>                  
                 ))}
                 {savesubjectvisible && 
                  subjectPlanlist.map(res =>(
                    <div>
                    <heading><b>SUBJECT NAME : </b>{res.subjectName}</heading>
                    <div><heading><b>DATE : </b>{getexamdate(res.examDateAndTimeId)}</heading></div>               
                    <div><heading><b>Time : </b>{getnoontime(res.examDateAndTimeId)}</heading></div>
                  <Table striped bordered hover responsive>
                    <thead className="text-primary">
                      <tr>
                        
                        <th>Room Name</th>
                        <th>Number of Students</th>                  
                      </tr>
                    </thead>
                    <tbody>
                      {/* {resultavailable && resdata.studentPlan.length} */}
                      {JSON.parse(res.summary).map(result=>(
                      <tr>
                        
                        <td>{getroomname(result.roomId)}</td>
                        <td>{result.numberOfStudents}</td>
                      </tr>
                       ))} 
                    </tbody>
                  </Table></div>                  
                   ))
                 }
                 </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
