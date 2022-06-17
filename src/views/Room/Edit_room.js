import React,{useEffect,useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Input, Label, Row, Col, FormGroup, Button } from "reactstrap";
import RoomService from "./Roomservice";
import UserService from "views/Login/Userservice";

export default function Edit_room() {

    const [getName, setName] = useState(false);
    const handleNameChange = () => {
      setName(!getName);
    }
  
    const roomState = {
      roomId:null,
      roomName: "",
    };
  
    const currentroomState = {
      currentroomId:null,
      currentroomName: "",
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
          roomId: roomvalue.roomId,
          roomName: roomvalue.roomName,     
      };
      //alert(data);
        RoomService.create(data).then(response => {
          alert("Success");
          setRoom({
            roomId: response.data.roomId,
            roomName: response.data.roomName,
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
            roomName: currentroom.currentroomName,
        };
            //alert(data);
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
        });
        console.log(response.data);
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

    // Modal open state
    const [modal, setModal] = React.useState(false);
  
    // Toggle for Modal
    const toggle = () => setModal(!modal);

    return (
        <>
            <div className="content">
                <title>Edit Room</title>
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
            </div>
        </>
    );
}