import React,{useState,useEffect} from "react";
import {
  Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button, Input, Modal, Label, FormGroup, ModalHeader, ModalBody, Form,
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import DepartmentService from "./Department/DepartmentService";
import UserService from "./Login/Userservice";
import StaffService from "./Staff/Staffservice";

export default function Staff() {

  const staffState = {
    staffId:null,
    staffName: "",
    departmentId:"",
    departmentName:"",
    dob:"",
  };

  const currentstaffState = {
    currentstaffId:null,
    currentstaffName: "",
    currentdepartmentId: "",
    currentdepartmentName:"",
    currentdob: "",
  };

  const [staffvalue,setStaff]=useState(staffState);
  const[submitted,setSubmitted]=useState(false);
  const [stafflist,setStafflist]=useState([]);
  const [currentstaff,setcurrentStaff]=useState(currentstaffState);
  const [departmentlist,setDepartmentlist]=useState([]);

  useEffect(() => {
    retrieveStaff();
    retrieveDepartment();
  }, []);

  const handleInputChange=event => {
    const{name,value}=event.target;
    setStaff({...staffvalue,[name]:value});
  };
  const currenthandleInputChange=event => {
    const{name,value}=event.target;
    setcurrentStaff({...currentstaff,[name]:value});
  };
  const saveStaff = (e) => {
    e.preventDefault();
    var data= {
        staffId:staffvalue.staffId,
        staffName: staffvalue.staffName,     
        departmentId:staffvalue.departmentId,
        dob:staffvalue.dob,
        departmentName:staffvalue.departmentName,
    };
    // alert(data);
      StaffService.create(data).then(response => {
        alert("Success");
        setStaff({
          staffId: response.data.staffId,
          staffName: response.data.staffName,
          departmentId:staffvalue.departmentId,
          dob:staffvalue.dob,
          departmentName:staffvalue.departmentName,
        });
        setSubmitted(true);
                console.log(response.data);
                retrieveStaff();
                newStaff();
      })
      .catch(e=>{
        alert(e);
        console.log(e);
      });
  };
  const newStaff = () => {
    setStaff(staffState);
    setSubmitted(false);
  };
  const retrieveStaff =() => {
      StaffService.getAll().then(response => {
      setStafflist(response.data);
      // console.log(response.data);
  })
      .catch(e => {
      console.log(e);
  });
  };

  const retrieveDepartment =() => {
    DepartmentService.getAll().then(response => {
    setDepartmentlist(response.data);
    // console.log(response.data);
    })
        .catch(e => {
        console.log(e);
    });
  };

  const updateStaff = (e) => {
      e.preventDefault();
      var data= {
          staffId: currentstaff.currentstaffId,
          staffName: currentstaff.currentstaffName,
          departmentId:currentstaff.currentdepartmentId,
          dob:currentstaff.currentdob,
          departmentName:currentstaff.currentdepartmentName,
      };
          // alert(data);
          StaffService.update(currentstaff.currentstaffId,data).
          then(response => {
          console.log(response.data);
          toggle1();
          alert("Success");
          retrieveStaff();            
      })
          .catch(e => {
          console.log(e);
      });
  };
  const getStaff = (id) => {
          StaffService.get(id).then(response => {
            setcurrentStaff({
            currentstaffId:response.data.staffId,
            currentstaffName:response.data.staffName,
            currentdepartmentId:response.data.departmentId,
            // currentdepartmentName:departmentlist.map(result =>{result.departmentName}),
            currentdob:response.data.dob,
      });
      // console.log(response.data);
      })
      .catch(e => {
          console.log(e);
  });

  };
  const deleteStaff = (id) => {
      StaffService.remove(id). then (
      response => {
          alert('Deleted Successfully...');           
      retrieveStaff();           
  })
  UserService.getAll().then((response)=>{
      response.data.filter(obj=>obj.staffId === id).map((val)=>
      UserService.remove(val.userId) .then (
          response => {}
      )
      )
  })   
      .catch(e => {
      console.log(e);
  });
  };

  function getDepartmentName(id){
    return departmentlist.filter(obj=> Number(obj.departmentId) === Number(id)).map(result=>{
      return result.departmentName;
    })
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
                <CardTitle tag="h4">Staff Details</CardTitle>
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
                        toggle={toggle}>Add Staff</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={saveStaff}>
                              <Row>
                                  <Col>
                                      <FormGroup>
                                      <Label>Staff Name</Label>
                                      <Input
                                          name="staffName"
                                          onChange={handleInputChange}
                                          value={staffvalue.staffName}
                                          placeholder="Staff Name"
                                          type="text" required
                                      />
                                      </FormGroup>
                                  </Col>
                              </Row>
                              <Row>
                                  <Col>
                                      <FormGroup>
                                      <Label>Date of Birth</Label>
                                      <Input
                                          name="dob"
                                          onChange={handleInputChange}
                                          value={staffvalue.dob}
                                          placeholder="DD-MM-YYYY"
                                          type="text" required
                                      />
                                      </FormGroup>
                                  </Col>
                              </Row>
                              <Row>
                                  <Col>
                                      <FormGroup>
                                      <Label>Department</Label>
                                      <Input
                                        type={"select"}
                                        name="departmentId"
                                        onChange={handleInputChange}
                                        value={staffvalue.departmentId}
                                      >
                                        {departmentlist.map(result =>(
                                          <option value={result.departmentId}>{result.departmentName}</option>
                                        ))}
                                      </Input>                                      
                                      </FormGroup>
                                      <Button color="primary" type="submit" value="Submit" onClick={toggle}>Submit</Button>
                                  </Col>
                              </Row>
                          </Form>
                        </ModalBody>
                    </Modal></td></tr></Table>
                </Col>
              </CardHeader>
              <CardBody>
                {/* <Button href="/Staff/Add" onClick={()=>history.push("/add")} >
                  Add <i class="nc-icon nc-simple-add"></i>
                </Button>  */}
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>#</th>
                      <th>Staff Name</th>
                      <th>D.O.B</th>
                      <th>Department</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    stafflist.map(result=>(   
                      <tr>
                        <td>{i++}</td>
                        <td>{result.staffName}</td>
                        <td>{result.dob}</td>
                        <td>{getDepartmentName(result.departmentId)}</td>
                        <td>                                            
                          <i class="fa-solid fa-pen fa-lg" onClick={() => { toggle1(); getStaff(result.staffId);}} ></i>
                          {/* <Button color="primary"
                          onClick={(()=>{toggle1();getStaff(result.staffId);})}>Edit</Button> */}
                          <Modal isOpen={modal1}
                              toggle={toggle1}
                              modalTransition={{ timeout: 2000 }}>
                              <ModalHeader
                              toggle={toggle1}>Edit Staff</ModalHeader>
                              <ModalBody>
                                <Form >
                                    <Row>
                                        <Col>
                                          <FormGroup>
                                            <Label>Staff Name</Label>
                                            <Input
                                                name="currentstaffName"
                                                onChange={currenthandleInputChange}
                                                value={currentstaff.currentstaffName}
                                                type="text" required
                                            />
                                          </FormGroup>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col>
                                          <FormGroup>
                                            <Label>Date of Birth</Label>
                                            <Input
                                                name="currentdob"
                                                onChange={currenthandleInputChange}
                                                value={currentstaff.currentdob}
                                                type="text" required
                                            />
                                          </FormGroup>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col>
                                          <FormGroup>
                                            <Label>Department</Label>
                                            <Input
                                              type={"select"}
                                              name="currentdepartmentId"
                                              onChange={currenthandleInputChange}
                                              value={currentstaff.departmentId}
                                            >
                                              {departmentlist.map(result =>(
                                                <option value={result.departmentId}>{result.departmentName}</option>
                                              ))}
                                            </Input>
                                          </FormGroup>
                                          <Button color="primary" onClick={updateStaff}>Update</Button>
                                        </Col>
                                      </Row>
                                  </Form>
                              </ModalBody>
                          </Modal>
                        </td><td>
                          <button class="btn btn-danger" onClick={(e) => { if (window.confirm('Are you sure! Do you want to delete this staff?')) deleteStaff(result.staffId) } }>Delete</button>
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

