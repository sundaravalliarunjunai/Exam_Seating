import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardHeader, CardBody, Table, Button, Input, CardTitle, Row, Col, ModalBody, ModalHeader, ModalFooter, Modal } from "reactstrap";
import Addsubject from "./Building/Addsubject";


export default function Subject() {

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
                <CardTitle tag="h4">Subject Details</CardTitle>
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
                        toggle={toggle}>Add Subject</ModalHeader>
                        <ModalBody>
                            <Addsubject />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={toggle}>Save</Button>
                        </ModalFooter>
                    </Modal>
                  </td></tr></Table>
                </Col>
              </CardHeader>
              <CardBody>
                {/* <Button href="/Building/Add" onClick={()=>history.push("/add")} >
                  Add <i class="nc-icon nc-simple-add"></i>
                </Button>  */}
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>S.No</th>
                      <th>Course Type</th>
                      <th>Course</th>
                      <th>Semester</th>
                      <th>Subject Code</th>
                      <th>Subject Name</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>UG</td>
                      <td>BCA</td>
                      <td >I</td>
                      <td>20UCAC11</td>
                      <td>Programming in C</td>
                        <td className="text-left" >
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
                      <td>PG</td>
                      <td>MCA</td>
                      <td>II</td>
                      <td>20PCAC12</td>
                      <td>Programming in Python</td>
                        <td className="text-left" >
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
