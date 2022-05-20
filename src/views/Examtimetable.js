import React from "react";
import {
  Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button, Input, ModalBody, ModalHeader, ModalFooter, Modal
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Addexam from './Building/Addexam';

export default function Examtimetable() {

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
                <CardTitle tag="h4">Exam Details</CardTitle>
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
                        toggle={toggle}>Add Exam</ModalHeader>
                        <ModalBody>
                            <Addexam />
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
                      <th>Date</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Subject Name</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td >1</td>
                      <td>4-04-2022</td>
                      <td>09_AM</td>
                      <td>12_AM</td>
                      <td>Digital Principles</td>
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
                    <td >2</td>
                      <td>10-04-2022</td>
                      <td>09_AM</td>
                      <td>12_AM</td>
                      <td>Computational Mathematics</td>
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
