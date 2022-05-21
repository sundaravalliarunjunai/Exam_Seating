import React, {useState, useEffect} from "react";
import {
  Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button, Modal, ModalBody, ModalHeader, ModalFooter, Input, Label, Form
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Add from './Building/Add';
import BuildingService from "./Building/Buildingservice";
import UserService from "./Login/Userservice";
import Edit_building from "./Building/Edit_building";

export default function Building() {

  const [getName, setName] = useState(false);
  const handleNameChange = () => {
    setName(!getName);
  }

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

  useEffect(() => {
    retrieveBuilding();
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
        setSubmitted(true);
                console.log(response.data);
                retrieveBuilding();
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
      BuildingService.getAll().then(response => {
      setBuildinglist(response.data);
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
          alert("Success");
          retrieveBuilding();            
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

  
  const handlebuttonChange = () => {
    setBuilding(!getBuilding);
  }

  let i=1;

  // Modal open state
  const [modal, setModal] = React.useState(false);
  
  // Toggle for Modal
  const toggle = () => setModal(!modal);
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
                        onClick={toggle}>{getName?'Close':''}<i class="nc-icon nc-simple-add"></i> Add</Button>
                    <Modal isOpen={modal}
                        toggle={toggle}
                        modalTransition={{ timeout: 2000 }}>
                        <ModalHeader
                        toggle={toggle}>Add Building</ModalHeader>
                        <ModalBody>
                            <Add />
                        </ModalBody>
                        {/* <ModalFooter>
                          <Button color="primary" onClick={newBuilding}>Reset</Button>
                          <Button color="primary" onClick={toggle}>Cancel</Button>
                        </ModalFooter> */}
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
                      <th 
                      // className="text-right"
                      >Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    buildinglist.map(result=>(   
                      <tr>
                        <td>{i++}</td>
                        <td>{result.buildingName}</td>
                        {/* <td>{result.emailId}</td> */}
                        <td>                                            
                          {/* <button class="btn btn-primary" onClick={( () => getBuilding(result.buildingId) )}>Edit</button> */}
                          <Button color="primary"
                          onClick={toggle}>{getBuilding(result.buildingId)}Edit</Button>
                          <Modal isOpen={modal}
                              toggle={toggle}
                              modalTransition={{ timeout: 2000 }}>
                              <ModalHeader
                              toggle={toggle}>Edit Building</ModalHeader>
                              <ModalBody>
                                  <Edit_building/>
                              </ModalBody>
                          </Modal>
                        </td><td>
                          <button class="btn btn-danger" onClick={(e) => { if (window.confirm('Are you sure! Do you want to delete this building?')) deleteBuilding(result.buildingId) } }>Delete</button>
                        </td>
                      </tr>
                      )
                    )
                  }
                  </tbody>
                </Table>
                {/* <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModal" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <Form className="forms-sample">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModal"> Edit Building</h5>
                          <Button  type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></Button>
                        </div>
                        <div className="modal-body">                                                    
                          <div className="form-group"> 
                            <Label class="lbl">Building Name</Label>                        
                            <Input class="form-control" type="text" placeholder='Enter here' onChange={currenthandleInputChange} value={currentbuilding.currentbuildingName} name="currentbuildingName" required/>
                          </div>                                                                                                                                                                                     
                        </div>
                        <div className="modal-footer">                                                    
                          <Button  className="btn btn-blue me-2 btn-rounded btn-fw"   onClick={updateBuilding}>Update</Button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}