import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardHeader, CardBody, Table, Button, Input, CardTitle, Row, Col, Modal, Label, Form, FormGroup, ModalHeader, ModalBody } from "reactstrap";
import UserService from "./Login/Userservice";
import RoomService from "./Room/Roomservice";
import BuildingService from "./Building/Buildingservice";

export default function Room() {

  const roomState = {
    roomId:null,
    roomName: "",
    seatCapacity:null,
    buildingId:null,
  };

  const currentroomState = {
    currentroomId:null,
    currentroomName: "",
    currentseatCapacity:null,
    currentbuildingId:null,
    currentbuildingName:"",
  };
  const [roomvalue,setRoom]=useState(roomState);
  const[submitted,setSubmitted]=useState(false);
  const [roomlist,setRoomlist]=useState([]);
  const [currentroom,setcurrentRoom]=useState(currentroomState);
  const [buildinglist,setBuildinglist]=useState([]);

  useEffect(() => {
    retrieveRoom();
    retrieveBuilding();
  }, []);

  const handleInputChange=event => {
    const{name,value}=event.target;
    setRoom({...roomvalue,[name]:value});
  };
  const currenthandleInputChange=event => {
    const{name,value}=event.target;
    setcurrentRoom({...currentroom,[name]:value});
  };
  const saveRoom = (e) => {
    e.preventDefault();
    var data= {
        roomId:roomvalue.roomId,
        roomName: roomvalue.roomName, 
        seatCapacity: roomvalue.seatCapacity,    
        buildingId:roomvalue.buildingId,
    };
    // alert(data);
      RoomService.create(data).then(response => {
        alert("Success");
        setRoom({
          roomId: response.data.roomId,
          roomName: response.data.roomName,
          seatCapacity:response.data.seatCapacity,
          buildingId:response.data.buildingId,
        });
        retrieveRoom();
        setSubmitted(true);
        console.log(response.data);
        newRoom();
      })
      .catch(e=>{
        alert(e);
        console.log(e);
      });
  };
  const newRoom = () => {
    setRoom(roomState);
    setSubmitted(false);
  };
  const retrieveRoom =() => {
      RoomService.getAll().then(response => {
      setRoomlist(response.data);
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
  const updateRoom = (e) => {
      e.preventDefault();
      var data= {
          roomId: currentroom.currentroomId,
          roomName: currentroom.currentroomName,
          seatCapacity: currentroom.currentseatCapacity,
          buildingId:currentroom.currentbuildingId,
          buildingName:currentroom.currentbuildingName,
      };
          // alert(data);
          RoomService.update(currentroom.currentroomId,data).
          then(response => {
          console.log(response.data);
          toggle1();
          alert("Success");
          retrieveRoom();            
      })
          .catch(e => {
          console.log(e);
      });
  };
  const getRoom = (id) => {
          RoomService.get(id).then(response => {
          setcurrentRoom({
          currentroomId:response.data.roomId,
          currentroomName:response.data.roomName,
          currentseatCapacity:response.data.seatCapacity,
          currentbuildingId:response.data.buildingId,
          currentbuildingName:getbuildingName(id),
      });
      // console.log(response.data);
      })
      .catch(e => {
          console.log(e);
  });

  };
  const deleteRoom = (id) => {
      RoomService.remove(id). then (
      response => {
          alert('Deleted Successfully...');           
      retrieveRoom();           
  })
  UserService.getAll().then((response)=>{
      response.data.filter(obj=>obj.roomId === id).map((val)=>
      UserService.remove(val.userId) .then (
          response => {}
      )
      )
  })   
      .catch(e => {
      console.log(e);
  });
  };

function getbuildingName(id){
  return buildinglist.filter(obj=> Number(obj.buildingId) === Number(id)).map(result=>{
    return result.buildingName;
  })
}
  
  const handlebuttonChange = () => {
    setRoom(!getRoom);
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
  let j=1;

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Room Details</CardTitle>
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
                        toggle={toggle}>Add Room</ModalHeader>
                        <ModalBody>
                          <Form onSubmit={saveRoom}>
                              <Row>
                                  <Col>
                                      <FormGroup>
                                      <Label>Building Name</Label>
                                      <Input
                                        type={"select"}
                                        name="buildingId"
                                        // size="2"
                                        onChange={handleInputChange}
                                        value={roomvalue.buildingId}
                                      >
                                        {buildinglist.map(result =>(
                                          <option value={result.buildingId}>{result.buildingName}</option>
                                        ))}
                                      </Input>
                                      
                                      {/* <Formselect>
                                        {buildinglist.map(result =>(
                                          <option value={result.buildingId}><Label>{result.buildingName}</Label></option>
                                        ))}
                                      </Formselect> */}
                                      {/* <select className="mt-4 col-md-8 col-offset-4">
                                        {
                                          //   buildinglist.map(result=>(
                                          //     <option value={getBuilding(result.buildingId)}>{getBuilding(result.buildingName)}</option>
                                          // ))
                                        }
                                      </select> */}
                                      </FormGroup>
                                  </Col>
                              </Row>
                              <Row>
                                  <Col>
                                      <FormGroup>
                                      <Label>Room Name</Label>
                                      <Input
                                          name="roomName"
                                          onChange={handleInputChange}
                                          value={roomvalue.roomName}
                                          placeholder="Room Name"
                                          type="text" required
                                      />
                                      </FormGroup>
                                  </Col>
                              </Row>
                              <Row>
                                  <Col>
                                      <FormGroup>
                                      <Label>Number of Seats</Label>
                                      <Input
                                          name="seatCapacity"
                                          onChange={handleInputChange}
                                          value={roomvalue.seatCapacity}
                                          placeholder="No of Seats"
                                          type="text" required
                                      />
                                      </FormGroup>
                                      <Button color="primary" type="submit" value="Submit" onClick={toggle}>Submit</Button>
                                  </Col>
                              </Row>
                          </Form>
                        </ModalBody>
                        {/* <ModalFooter>
                            <Button color="primary" onClick={toggle}>Save</Button>
                        </ModalFooter> */}
                    </Modal>
                    </td></tr></Table>
                </Col>
              </CardHeader>
              <CardBody>
                {/* <Button href="/Room/Add" onClick={()=>history.push("/add")} >
                  Add <i class="nc-icon nc-simple-add"></i>
                </Button>  */}
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>#</th>
                      <th>Room Name</th>
                      <th>Building Name</th>
                      <th>No of seats</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    roomlist.map(result=>(   
                      <tr>
                        <td>{i++}</td>
                        <td>{result.roomName}</td>
                        <td>
                          {getbuildingName(result.buildingId)}
                        </td>
                        <td>{result.seatCapacity}</td>
                        {/* <td>{result.emailId}</td> */}
                        <td>                                            
                          <i class="fa-solid fa-pen fa-lg" onClick={() => { toggle1(); getRoom(result.roomId);}} ></i>
                          {/* <Button color="primary"
                          onClick={()=>{toggle1();getRoom(result.roomId);}}>Edit</Button> */}
                          <Modal isOpen={modal1}
                              toggle={toggle1}
                              modalTransition={{ timeout: 2000 }}>
                              <ModalHeader
                              toggle={toggle1}>Edit Room</ModalHeader>
                              <ModalBody>
                                <Form >
                                  <Row>
                                      <Col>
                                          <FormGroup>
                                          <Label>Building Name</Label>
                                          <Input
                                              name="currentbuildingName"
                                              onChange={currenthandleInputChange}
                                              value={getbuildingName(currentroom.currentbuildingId)}
                                              type="text" required
                                          />
                                          </FormGroup>
                                      </Col>
                                  </Row>
                                  <Row>
                                      <Col>
                                          <FormGroup>
                                          <Label>Room Name</Label>
                                          <Input
                                              name="currentroomName"
                                              onChange={currenthandleInputChange}
                                              value={currentroom.currentroomName}
                                              type="text" required
                                          />
                                          </FormGroup>
                                      </Col>
                                  </Row>
                                  <Row>
                                      <Col>
                                          <FormGroup>
                                          <Label>No of Seats</Label>
                                          <Input
                                              name="currentseatCapacity"
                                              onChange={currenthandleInputChange}
                                              value={currentroom.currentseatCapacity}
                                              type="text" required
                                          />
                                          </FormGroup>
                                          <Button color="primary" onClick={updateRoom}>Update</Button>
                                      </Col>
                                  </Row>
                                </Form>
                              </ModalBody>
                          </Modal>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <i class="fa-solid fa-trash fa-lg" onClick={(e) => { if (window.confirm('Are you sure! Do you want to delete this room?')) deleteRoom(result.roomId) } } ></i>
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
