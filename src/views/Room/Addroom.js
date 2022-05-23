import React,{useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Input, Row, Col, FormGroup, Label, Button } from "reactstrap";
import UserService from "views/Login/Userservice";
import RoomService from "./Roomservice";
import BuildingService from "../Building/Buildingservice";

export default function Addroom() {

  const [getName, setName] = useState(false);
  const handleNameChange = () => {
    setName(!getName);
  }

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

  const [roomvalue,setRoom]=useState(roomState);
  const[submitted,setSubmitted]=useState(false);
  const [roomlist,setRoomlist]=useState([]);
  const [currentroom,setcurrentRoom]=useState(currentroomState);

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
        setSubmitted(true);
                console.log(response.data);
                retrieveRoom();
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
  
  const handlebuttonChange = () => {
    setRoom(!getRoom);
  }

  const [buildinglist,setBuildinglist]=useState([]);

  const retrieveBuilding =() => {
    BuildingService.getAll().then(response => {
    setBuildinglist(response.data);
    // console.log(response.data);
})
    .catch(e => {
    console.log(e);
});
};

  // Modal open state
  const [modal, setModal] = React.useState(false);
  
  // Toggle for Modal
  const toggle = () => setModal(!modal);

    return (
        <>
            <div className="content">
                <title>Add Room</title>
                <Form>
                    <Row>
                        <Col>
                            <FormGroup>
                            <Label>Building Name</Label>
                            <select className="mt-4 col-md-8 col-offset-4">
                                {buildinglist.map(result=>(
                                    <option value={result.buildingId}>{result.buildingName}</option>
                                ))}
                            </select>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                            <Label>Room Number</Label>
                            <Input
                                name="r_no"
                                placeholder="Room Number"
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
            </div>
        </>
    );
}