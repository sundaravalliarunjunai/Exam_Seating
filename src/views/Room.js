import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardHeader, CardBody, Table, Button, Input, CardTitle, Row, Col, Modal, Label, Form, FormGroup, ModalHeader, ModalBody } from "reactstrap";
import Edit_room from "./Room/Edit_room";
import UserService from "./Login/Userservice";
import RoomService from "./Room/Roomservice";
import BuildingService from "./Building/Buildingservice";

export default function Room() {

  const roomState = {
    roomId:null,
    roomName: "",
    seatCapacity:null,
  };

  const currentroomState = {
    currentroomId:null,
    currentroomName: "",
    currentseatCapacity:null,
  };
  const currentbuildingState = {
    buildingId:null,
    buildingName: "",
  };

  const [roomvalue,setRoom]=useState(roomState);
  const[submitted,setSubmitted]=useState(false);
  const [roomlist,setRoomlist]=useState([]);
  const [currentroom,setcurrentRoom]=useState(currentroomState);
  const [buildinglist,setcurrentBuilding]=useState(currentbuildingState);

  useEffect(() => {
    retrieveRoom();
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
    };
    // alert(data);
      RoomService.create(data).then(response => {
        alert("Success");
        setRoom({
          roomId: response.data.roomId,
          roomName: response.data.roomName,
          seatCapacity:response.data.seatCapacity,
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
  const updateRoom = (e) => {
      e.preventDefault();
      var data= {
          roomId: currentroom.currentroomId,
          roomName: currentroom.currentroomName,
          seatCapacity: currentroom.currentseatCapacity,
      };
          // alert(data);
          RoomService.update(currentroom.currentroomId,data).
          then(response => {
          console.log(response.data);
          alert("Success");
          toggle1();
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

  const getBuilding = (id) => {
    BuildingService.get(id).then(response => {
    setcurrentBuilding({
    value:response.data.buildingId,
    label:response.data.buildingName,
});
// console.log(response.data);
})
.catch(e => {
    console.log(e);
});

};
  
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
                          <Form>
                              <Row>
                                  <Col>
                                      <FormGroup>
                                      <Label>Building Name</Label>
                                      {/* <Form.select>
                                        {buildinglist.map(result =>(
                                          <option value={result.value}><Label>{result.label}</Label></option>
                                        ))}
                                      </Form.select> */}
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
                                          name="no_seats"
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
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    roomlist.map(result=>(   
                      <tr>
                        <td>{i++}</td>
                        <td>{result.roomName}</td>
                        <td>
                          {/* {buildinglist.map(result1=>(result1.buildingName))} */}
                        </td>
                        <td>{result.seatCapacity}</td>
                        {/* <td>{result.emailId}</td> */}
                        <td>                                            
                          {/* <button class="btn btn-primary" onClick={( () => getRoom(result.roomId) )}>Edit</button> */}
                          <Button color="primary"
                          onClick={()=>{toggle1();getRoom(result.roomId);}}>Edit</Button>
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
                                        <Label>Room Name</Label>
                                        <Input
                                            name="currentroomName"
                                            onChange={currenthandleInputChange}
                                            value={currentroom.currentroomName}
                                            type="text" required
                                        />
                                        </FormGroup>
                                        <Button color="primary" onClick={updateRoom}>Update</Button>
                                    </Col>
                                </Row>
                            </Form>
                              </ModalBody>
                          </Modal>
                        </td><td>
                          <button class="btn btn-danger" onClick={(e) => { if (window.confirm('Are you sure! Do you want to delete this room?')) deleteRoom(result.roomId) } }>Delete</button>
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
