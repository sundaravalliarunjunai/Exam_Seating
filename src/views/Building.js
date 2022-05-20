import React, {useState} from "react";
import {
  Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button, Modal, ModalBody, ModalHeader, ModalFooter, Input,
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Add from './Building/Add';

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
                        onClick={toggle}><i class="nc-icon nc-simple-add"></i> Add</Button>
                    <Modal isOpen={modal}
                        toggle={toggle}
                        modalTransition={{ timeout: 2000 }}>
                        <ModalHeader
                        toggle={toggle}>Add Building</ModalHeader>
                        <ModalBody>
                            <Add />
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
                      <th>Building Name</th>
                      <th>No of Rooms</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Block1</td>
                      <td>20</td>
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
                      <td>Block2</td>
                      <td>25</td>
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
