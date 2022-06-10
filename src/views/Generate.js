import React, { useEffect } from "react";
import {
  Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button,
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

export default function Generate() {

  const [jsonbuilding,setjsonbuilding]=React.useState([]);
  const [jsonroom,setjsonroom]=React.useState([]);
  const [jsonstaff,setjsonstaff]=React.useState([]);
  const [jsonsubject,setjsonsubject]=React.useState([]);
  const [jsonstudent,setjsonstudent]=React.useState([]);
  const [jsonexamdate,setjsonexamdate]=React.useState([]);
  const [jsonexamdateandtime,setjsonexamdateandtime]=React.useState([]);
  const [resdata,setresponsedata]=React.useState([]);

  useEffect(()=>{
    setjsonbuilding([]);
    setjsonexamdate([]);
    setjsonexamdateandtime([]);
    setjsonroom([]);
    setjsonstaff([]);
    setjsonstudent([]);
    setjsonsubject([]);
    BuildingService.getAll().then(response => {
                
      response.data.map(obj=>{
          setjsonbuilding(jsonbuilding=>[...jsonbuilding,{
          "buildingId":obj.buildingId,
          "buildingName":obj.buildingName
          }]);
      })
      console.log("jsonbuilding",response.data)
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
      console.log("jsonroom",response.data)
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
            if (response.status===200){
            console.log("response",response.data)
            setresponsedata(response.data)
                                                            
        }
        else if(response.status === 500){
            alert(response.data)
           
        } 
        else if(response.status === 406){
            alert("Unrecognized Input = " + response.data)
            
        }                
    })
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

  return (
    <>
      <div className="content">
      <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Report Generation</CardTitle>
                <Col md="5" ><Table><tr><td>
                  <Button color="success" 
                    onClick={()=>{algorithm();}}
                  ><i class="nc-icon nc-cloud-download-93"></i> Run Algorithm
                  </Button>
                  </td></tr></Table>
                </Col>
                <Col md="6" ><Table><tr>
                  <td>
                    <Button color="success" 
                      onClick={()=>{exportdata();}}
                    ><i class="nc-icon nc-cloud-download-93"></i>Export</Button>
                  </td>
                  </tr></Table>
                </Col>
              </CardHeader>
              <CardBody>
                <Table responsive>
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
                    <tr>
                      <td>{i++}</td>
                      <td></td>
                    </tr>
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
