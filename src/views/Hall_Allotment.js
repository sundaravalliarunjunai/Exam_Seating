import React, { useEffect } from "react";
import {
  Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button,
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {getStudentId} from './Login/Common.js';
import StudentPlanService from "./Generate/StudentPlanService.js";
import BuildingService from "./Building/Buildingservice.js";
import RoomService from "./Room/Roomservice.js";
import SubjectService from "./Subject/Subjectservice.js";
import ExamDateService from "./Examtimetable/ExamDateService.js";
import { Redirect } from "react-router";

export default function Hall_Allotment() {

  const [studentPlanlist,setStudentPlanlist]=React.useState([]);
  const [studentId,setStudentId]=React.useState([]);
  const [buildinglist,setBuildinglist]=React.useState([]);
  const [roomlist,setRoomlist]=React.useState([]);
  const [examDatelist,setExamDatelist]=React.useState([]);
  const [subjectlist,setSubjectlist]=React.useState([]);

  useEffect(()=>{
    retrieveStudentPlan();
    retrieveBuilding();
    retrieveRoom();
    retrieveExamDate();
    retrieveSubject();
    setStudentId(getStudentId());
  },[]);

  const retrieveStudentPlan =() => {
    StudentPlanService.getAll().then(response => {
      setStudentPlanlist(response.data);
    // console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };
  const retrieveBuilding =() => {
    BuildingService.getAll().then(response => {
      setBuildinglist(response.data);
    // console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
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
  const retrieveSubject =() => {
    SubjectService.getAll().then(response => {
      setSubjectlist(response.data);
    //  console.log("subject",subjectlist.length);
    //  console.log("subject",subjectlist);
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
  let getsubjectName=(id)=>{
    // return subjectlist.filter(obj=>( Number(obj.subjectId) === Number(id)).map(ob=>{
    //   return ob.subjectName;
    // })
    return Object.keys(subjectlist).filter(val=> subjectlist[val].subjectId === id).map(product => {
      return subjectlist[product].subjectName
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

  if(studentId === "" ){
    return <Redirect to ="/login"></Redirect>
  }

  return (
    <>
      <div className="content">
      <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Hall Allocated</CardTitle>
              </CardHeader>
              <CardBody>
                {/* <Button href="/Building/Add" onClick={()=>history.push("/add")} >
                  Add <i class="nc-icon nc-simple-add"></i>
                </Button>  */}
                {/* <p>{getStudentId()}</p> */}                
                {studentPlanlist.filter(obj=> obj.studentId === studentId).map(res=>(                 
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
                ))}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
