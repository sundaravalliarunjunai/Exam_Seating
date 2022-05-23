import React,{useState,useEffect} from "react";
import {
  Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button, Input, Modal, ModalFooter, ModalHeader, ModalBody,
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Addstaff from './Staff/Addstaff';
import UserService from "./Login/Userservice";
import StaffService from "./Staff/Staffservice";
import Edit_staff from "./Staff/Edit_staff";

export default function Staff() {

  const staffState = {
    staffId:null,
    staffName: "",
    departmentName:"",
    dob:"",
  };

  const currentstaffState = {
    currentstaffId:null,
    currentstaffName: "",
    currentdepartmentName: "",
    currentdob: "",
  };

  const [staffvalue,setStaff]=useState(staffState);
  const[submitted,setSubmitted]=useState(false);
  const [stafflist,setStafflist]=useState([]);
  const [currentstaff,setcurrentStaff]=useState(currentstaffState);

  useEffect(() => {
    retrieveStaff();
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
        departmentName:staffvalue.departmentName,
        dob:staffvalue.dob,
    };
    // alert(data);
      StaffService.create(data).then(response => {
        alert("Success");
        setStaff({
          staffId: response.data.staffId,
          staffName: response.data.staffName,
          departmentName:staffvalue.departmentName,
          dob:staffvalue.dob,
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
  const updateStaff = (e) => {
      e.preventDefault();
      var data= {
          staffId: currentstaff.currentstaffId,
          staffName: currentstaff.currentstaffName,
          departmentName:currentstaff.currentdepartmentName,
          dob:currentstaff.currentdob,
      };
          // alert(data);
          StaffService.update(currentstaff.currentstaffId,data).
          then(response => {
          console.log(response.data);
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
          currentdepartmentName:response.data.departmentName,
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

  
  const handlebuttonChange = () => {
    setStaff(!getStaff);
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
                            <Addstaff />
                        </ModalBody>
                        {/* <ModalFooter>
                            <Button color="primary" onClick={toggle}>Save</Button>
                        </ModalFooter> */}
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
                        <td>
                          {/* {result.departmentName} */}
                        </td>
                        {/* <td>{result.emailId}</td> */}
                        <td>                                            
                          {/* <button class="btn btn-primary" onClick={( () => getStaff(result.staffId) )}>Edit</button> */}
                          <Button color="primary"
                          onClick={toggle1}>{getStaff(result.staffId)}Edit</Button>
                          <Modal isOpen={modal1}
                              toggle={toggle1}
                              modalTransition={{ timeout: 2000 }}>
                              <ModalHeader
                              toggle={toggle1}>Edit Staff</ModalHeader>
                              <ModalBody>
                                  <Edit_staff/>
                              </ModalBody>
                          </Modal>
                        </td><td>
                          <button class="btn btn-danger" onClick={(e) => { if (window.confirm('Are you sure! Do you want to delete this staff?')) deleteStaff(result.staffId) } }>Delete</button>
                        </td>
                      </tr>
                      )
                    )
                  }
                    {/* <tr>
                      <td>1</td>
                      <td>S.Varshini</td>
                      <td>10-07-1999</td>
                      <td>SV</td>
                        <td className="text-center" >
                        <button class="btn btn-primary" 
                          //onclick="GetDetails('.$purchaseid.')"
                          >Edit</button>
                        </td>
                        <td>
				                  <button class="btn btn-danger" 
                          //</td>onclick="DeleteUser('.$purchaseid.')"
                          >Delete
                        </button></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>P.Pavithra</td>
                      <td>02-09-1998</td>
                      <td>PP</td>
                      <td className="text-center" >
                        <button class="btn btn-primary" 
                          //onclick="GetDetails('.$purchaseid.')"
                          >Edit</button>
                        </td>
                        <td>
				                  <button class="btn btn-danger" 
                          //</td>onclick="DeleteUser('.$purchaseid.')"
                          >Delete
                        </button></td>
                    </tr> */}
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

