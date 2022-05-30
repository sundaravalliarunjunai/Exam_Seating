import React, {useState, useEffect} from "react";
import {
  FormGroup,Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button, Modal, ModalBody, ModalHeader, ModalFooter, Input, Label, Form
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
// import Add from './Department/Add';
import DepartmentService from "./Department/DepartmentService";
import UserService from "./Login/Userservice";

export default function Department() {

  const departmentState = {
    departmentId:null,
    departmentName: "",
  };

  const currentdepartmentState = {
    currentdepartmentId:null,
    currentdepartmentName: "",
  };

  const [departmentvalue,setDepartment]=useState(departmentState);
  const[submitted,setSubmitted]=useState(false);
  const [departmentlist,setDepartmentlist]=useState([]);
  const [currentdepartment,setcurrentDepartment]=useState(currentdepartmentState);


  useEffect(() => {
    retrieveDepartment();
  }, []);

  const handleInputChange=event => {
    const{name,value}=event.target;
    setDepartment({...departmentvalue,[name]:value});
  };
  const currenthandleInputChange=event => {
    const{name,value}=event.target;
    setcurrentDepartment({...currentdepartment,[name]:value});
  };
  const saveDepartment = (e) => {
    e.preventDefault();
    var check=departmentlist.filter(obj =>obj.departmentName === departmentvalue.departmentName).length;
    var data= {
        departmentId:departmentvalue.departmentId,
        departmentName: departmentvalue.departmentName,     
    };
    if(check === 0){
      DepartmentService.create(data).then(response => {
        alert("Success");
        setDepartment({
          departmentId: response.data.departmentId,
          departmentName: response.data.departmentName,
        });
        retrieveDepartment();
        setSubmitted(true);
        console.log(response.data);
        newDepartment();
      })
      .catch(e=>{
        alert(e);
        console.log(e);
      });
    }
    else{
        alert("Already Department Name Exist in the list");
    }
  };

  const newDepartment = () => {
    setDepartment(departmentState);
    setSubmitted(false);
  };
  const retrieveDepartment =() => {
   //alert("Retrive Department List...")
      DepartmentService.getAll().then(response => {
      setDepartmentlist(response.data);
      // console.log(response.data);
  })
      .catch(e => {
      console.log(e);
  });
  };
  
  const updateDepartment = (e) => {
      e.preventDefault();
      var data= {
          departmentId: currentdepartment.currentdepartmentId,
          departmentName: currentdepartment.currentdepartmentName,
      };
          // alert(data);
          DepartmentService.update(currentdepartment.currentdepartmentId,data).
          then(response => {
          console.log(response.data);
          toggle1();
          alert("Success");
          retrieveDepartment(); 
                     
      })
          .catch(e => {
          console.log(e);
      });
  };
  const getDepartment = (id) => {
          DepartmentService.get(id).then(response => {
          setcurrentDepartment({
          currentdepartmentId:response.data.departmentId,
          currentdepartmentName:response.data.departmentName,
      });
      // console.log(response.data);
      })
      .catch(e => {
          console.log(e);
  });

  };
  const deleteDepartment = (id) => {
      DepartmentService.remove(id). then (
      response => {
          alert('Deleted Successfully...');           
          retrieveDepartment();           
          
      })
      UserService.getAll().then((response)=>{
          response.data.filter(obj=>obj.departmentId === id).map((val)=>
          UserService.remove(val.userId) .then (
              response => {}
          )
          )
      })   
          .catch(e => {
          console.log(e);
      });
  };

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
                <CardTitle tag="h4">Department Details</CardTitle>
                <Col md="5" ><Table><tr><td><Input type='search' placeholder="Search.." className="px2 py1" aria-label="search" ></Input>
                  {/* <i class='nc-icon nc-zoom-split'></i> */}
                  </td><td>
                    <Button color="success"
                        onClick={toggle}><i class="nc-icon nc-simple-add"></i> Add</Button>
                    <Modal isOpen={modal}
                        toggle={toggle}
                        modalTransition={{ timeout: 2000 }}>
                        <ModalHeader
                        toggle={toggle}>Add Department</ModalHeader>
                        <ModalBody>
                        <Form onSubmit={saveDepartment}>
                          <Row>
                              <Col>
                                  <FormGroup>
                                  <Label>Department Name</Label>
                                  <Input
                                      name="departmentName"
                                      onChange={handleInputChange}
                                      value={departmentvalue.departmentName}
                                      placeholder="Department Name"
                                      type="text" required
                                  />
                                  </FormGroup>
                                  <Button color="primary" type="submit" value="Submit" onClick={toggle}>Submit</Button>
                              </Col>
                          </Row>
                      </Form>
                        </ModalBody>
                        {/* <ModalFooter>
                          <Button color="primary" onClick={newDepartment}>Reset</Button>
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
                      <th>Department Name</th>
                      {/* <th>No of Rooms</th> */}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    departmentlist.map(result=>(  
                      <tr>
                        <td>{i++}</td>
                        <td>{result.departmentName}</td>
                        <td>                                            
                          <i class="fa-solid fa-pen fa-lg" onClick={() => { toggle1(); getDepartment(result.departmentId);}} ></i>
                          {/* <Button color="primary"
                        onClick={() => { toggle1(); getDepartment(result.departmentId);}}>Edit</Button> */}
                          <Modal isOpen={modal1}
                              toggle={toggle1}
                              modalTransition={{ timeout: 2000 }}>
                              <ModalHeader
                              toggle={toggle1}>Edit Department</ModalHeader>
                              <ModalBody>
                                <Form >
                                  <Row>
                                      <Col>
                                          <FormGroup>
                                          <Label>Department Name</Label>
                                          <Input
                                              name="currentdepartmentName"
                                              onChange={currenthandleInputChange}
                                              value={currentdepartment.currentdepartmentName}
                                              type="text" required
                                          />
                                          </FormGroup>
                                          <Button color="primary" onClick={updateDepartment}>Update</Button>
                                      </Col>
                                  </Row>
                                </Form>
                              </ModalBody>
                          </Modal>
                        {/* </td><td>
                          <button class="btn btn-danger" onClick={(e) => { if (window.confirm('Are you sure! Do you want to delete this department?')) deleteDepartment(result.departmentId) } }>Delete</button> */}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <i class="fa-solid fa-trash fa-lg" onClick={(e) => { if (window.confirm('Are you sure! Do you want to delete this department detail?')) deleteDepartment(result.departmentId) } } ></i>
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