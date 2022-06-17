import React,{useEffect} from "react";
import {
  Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button,
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {getStaffId} from './Login/Common.js';
import StaffPlanService from "./Generate/StaffPlanService.js";
import BuildingService from "./Building/Buildingservice.js";
import RoomService from "./Room/Roomservice.js";
import ExamDateService from "./Examtimetable/ExamDateService.js";

export default function Staff_Hall_Allotment() {

  const [staffPlanlist,setStaffPlanlist]=React.useState([]);
  const [staffId,setStaffId]=React.useState([]);
  const [buildinglist,setBuildinglist]=React.useState([]);
  const [roomlist,setRoomlist]=React.useState([]);
  const [examDatelist,setExamDatelist]=React.useState([]);

  useEffect(()=>{
    retrieveStaffPlan();
    retrieveBuilding();
    retrieveRoom();
    retrieveExamDate();
    setStaffId(getStaffId());
  },[]);

  const retrieveStaffPlan =() => {
    StaffPlanService.getAll().then(response => {
      setStaffPlanlist(response.data);
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
  const retrieveRoom =() => {
    RoomService.getAll().then(response => {
      setRoomlist(response.data);     
    })
    .catch(e => {
      console.log(e);
    });
  };

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
                {staffPlanlist.filter(obj=> obj.staffId === staffId).map(res=>( 
                  // res.schedule.length === 0 ? <p>No Schedule</p> :                
                  res.schedule.length > 0 &&  
                  <div>                
                    <heading><b>STAFF NAME :</b> {res.staffName}</heading><br></br>                    
                    <Table responsive>
                      <thead className="text-primary">
                        <tr>                      
                          <th>Date</th>
                          <th>Time</th>
                          <th>Block Name</th>
                          <th>Room Name</th>                          
                        </tr>
                      </thead>
                      <tbody>
                        {JSON.parse(res.schedule).length > 0 ? JSON.parse(res.schedule).map(result=>(
                          <tr>
                            
                            <td>{getexamdate(result.examDateAndTimeId)}</td>
                            <td>{getnoontime(result.examDateAndTimeId)}</td>                            
                            <td>{getbuildingId(result.roomId)}</td>
                            <td>{getroomname(result.roomId)}</td>                          
                          </tr>                          
                        )):
                        <tr><td>No Schedule</td></tr>
                      } 
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
