import React from "react";
import {
  Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button, Input,Modal, ModalFooter,
  ModalHeader, ModalBody
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Addstudent from './Building/Addstudent';


export default function Student() {

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
                <CardTitle tag="h4">Student Details</CardTitle>
                <Col md="5" ><Table><tr><td><Input type='search' placeholder="Search.." className="px2 py1" aria-label="search" ></Input>
                  {/* <i class='nc-icon nc-zoom-split'></i> */}
                  </td><td>
                  <Button color="success"
                        onClick={toggle}><i class="nc-icon nc-simple-add"></i> Add</Button>
                    <Modal isOpen={modal}
                        toggle={toggle}
                        modalTransition={{ timeout: 2000 }}>
                        <ModalHeader
                        toggle={toggle}>Add Student</ModalHeader>
                        <ModalBody>
                            <Addstudent />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={toggle}>Save</Button>
                        </ModalFooter>
                    </Modal>
                  </td></tr></Table>
                </Col>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Reg No</th>
                      <th>D.O.B</th>
                      <th>Class</th>
                      <th>Department</th>
                      <th>Course</th>
                      <th>Course Type</th>
                      <th>Semester</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center" >1</td>
                      <td>S.Varshini</td>
                      <td>20801917</td>
                      <td>10-07-2000</td>
                      <td className="text-center">I</td>
                      <td className="text-center">MCA</td>
                      <td className="text-center">MCA</td>
                      <td className="text-center">PG</td>
                      <td className="text-center">II</td>
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
                      <td className="text-center">2</td>
                      <td>P.Pavithra</td>
                      <td>20203022</td>
                      <td>02-09-2002</td>
                      <td className="text-center">II</td>
                      <td className="text-center">Commerce</td>
                      <td className="text-center">M.Com</td>
                      <td className="text-center">PG</td>
                      <td className="text-center">I</td>
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

