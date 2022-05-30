import React, {useState, useEffect} from "react";
import {
  FormGroup,Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button, Modal, ModalBody, ModalHeader, Input, Label, Form
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
// import Add from './Building/Add';
import BuildingService from "./Building/Buildingservice";
import UserService from "./Login/Userservice";
// import Edit_building from "./Building/Edit_building";
import RoomService from "./Room/Roomservice";

export default function Building() {

  const buildingState = {
    buildingId:null,
    buildingName: "",
  };

  const currentbuildingState = {
    currentbuildingId:null,
    currentbuildingName: "",
  };

  const [buildingvalue,setBuilding]=useState(buildingState);
  const[submitted,setSubmitted]=useState(false);
  const [buildinglist,setBuildinglist]=useState([]);
  const [currentbuilding,setcurrentBuilding]=useState(currentbuildingState);
  const [roomlist,setRoomlist]=useState([]);

  useEffect(() => {
    retrieveBuilding();
    retrieveRoom();
  }, []);

  const handleInputChange=event => {
    const{name,value}=event.target;
    setBuilding({...buildingvalue,[name]:value});
  };
  const currenthandleInputChange=event => {
    const{name,value}=event.target;
    setcurrentBuilding({...currentbuilding,[name]:value});
  };
  const saveBuilding = (e) => {
    e.preventDefault();
    var data= {
        buildingId:buildingvalue.buildingId,
        buildingName: buildingvalue.buildingName,     
    };
    // alert(data);
      BuildingService.create(data).then(response => {
        alert("Success");
        setBuilding({
          buildingId: response.data.buildingId,
          buildingName: response.data.buildingName,
        });
        retrieveBuilding();
        setSubmitted(true);
        console.log(response.data);
        newBuilding();
      })
      .catch(e=>{
        alert(e);
        console.log(e);
      });
  };
  const newBuilding = () => {
    setBuilding(buildingState);
    setSubmitted(false);
  };
  const retrieveBuilding =() => {
   //alert("Retrive building List...")
      BuildingService.getAll().then(response => {
      setBuildinglist(response.data);
      // console.log(response.data);
  })
      .catch(e => {
      console.log(e);
  });
  };

  const retrieveRoom =() => {
    //alert("Retrive building List...")
       RoomService.getAll().then(response => {
       setRoomlist(response.data);
       // console.log(response.data);
   })
       .catch(e => {
       console.log(e);
   });
   };
  
  const updateBuilding = (e) => {
      e.preventDefault();
      var data= {
          buildingId: currentbuilding.currentbuildingId,
          buildingName: currentbuilding.currentbuildingName,
      };
          // alert(data);
          BuildingService.update(currentbuilding.currentbuildingId,data).
          then(response => {
          console.log(response.data);
          toggle1();
          alert("Success");
          retrieveBuilding(); 
          retrieveRoom();           
      })
          .catch(e => {
          console.log(e);
      });
  };
  const getBuilding = (id) => {
          BuildingService.get(id).then(response => {
          setcurrentBuilding({
          currentbuildingId:response.data.buildingId,
          currentbuildingName:response.data.buildingName,
      });
      // console.log(response.data);
      })
      .catch(e => {
          console.log(e);
  });

  };
  const deleteBuilding = (id) => {
      BuildingService.remove(id). then (
      response => {
          alert('Deleted Successfully...');           
          retrieveBuilding();           
          retrieveRoom();
      })
      UserService.getAll().then((response)=>{
          response.data.filter(obj=>obj.buildingId === id).map((val)=>
          UserService.remove(val.userId) .then (
              response => {}
          )
          )
      })   
          .catch(e => {
          console.log(e);
      });
  };

  function getNumberofRooms (id){
    return roomlist.filter(obj=>obj.buildingId === id).length
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
 

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Building Details</CardTitle>
                <Col md="5" ><Table><tr><td><Input type='search' placeholder="Search.." className="px2 py1" aria-label="search" ></Input>
                  {/* <i class='nc-icon nc-zoom-split'></i> */}
                  </td><td>
                    <Button color="success"
                        onClick={toggle}><i class="nc-icon nc-simple-add"></i> Add</Button>
                    <Modal isOpen={modal}
                        toggle={toggle} fade={false} >
                        {/* modalTransition={{ timeout: 2000 }} */}
                        <ModalHeader
                        toggle={toggle}>Add Building</ModalHeader>
                        <ModalBody>
                        <Form onSubmit={saveBuilding}>
                          <Row>
                              <Col>
                                  <FormGroup>
                                  <Label>Building Name</Label>
                                  <Input
                                      name="buildingName"
                                      onChange={handleInputChange}
                                      value={buildingvalue.buildingName}
                                      placeholder="Building Name"
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
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>#</th>
                      <th>Building Name</th>
                      <th>No of Rooms</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    buildinglist.map(result=>(  
                      <tr>
                        <td>{i++}</td>
                        <td>{result.buildingName}</td>
                        <td>{getNumberofRooms(result.buildingId)}</td>
                        {/* <td>{result.emailId}</td> */}
                        <td>                                            
                          <i class="fa-solid fa-pen fa-lg" onClick={() => { toggle1(); getBuilding(result.buildingId);}} ></i>
                          {/* <Button color="primary"
                        onClick={() => { toggle1(); getBuilding(result.buildingId);}}>Edit</Button> */}
                          <Modal isOpen={modal1} 
                            toggle={toggle1} fade={false} >
                               {/* modalTransition={{ timeout: 2000 }} */}
                              <ModalHeader
                              toggle={toggle1}>Edit Building</ModalHeader>
                              <ModalBody>
                                <Form >
                                  <Row>
                                      <Col>
                                          <FormGroup>
                                          <Label>Building Name</Label>
                                          <Input
                                              name="currentbuildingName"
                                              onChange={currenthandleInputChange}
                                              value={currentbuilding.currentbuildingName}
                                              type="text" required
                                          />
                                          </FormGroup>
                                          <Button color="primary" onClick={updateBuilding}>Update</Button>
                                      </Col>
                                  </Row>
                                </Form>
                              </ModalBody>
                          </Modal>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <i class="fa-solid fa-trash fa-lg" onClick={(e) => { if (window.confirm('Are you sure! Do you want to delete this building?')) deleteBuilding(result.buildingId) } } ></i>
                          {/* <button class="btn btn-danger" onClick={(e) => { if (window.confirm('Are you sure! Do you want to delete this building?')) deleteBuilding(result.buildingId) } }>Delete</button> */}
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