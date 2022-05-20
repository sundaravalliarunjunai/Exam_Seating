import React from "react";
import {
  Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button,
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link } from "react-router-dom";

export default function Generate() {
  // const [dropdownOpen, setDropdownOpen] = React.useState(false);
  // const dropdownToggle = (e) => {
  //   setDropdownOpen(!dropdownOpen);
  // };

  // Modal open state
  //const [modal, setModal] = React.useState(false);
  
  // Toggle for Modal
  //const toggle = () => setModal(!modal);

  return (
    <>
      <div className="content">
      <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Report Generation</CardTitle>
                <Col md="5" ><Table><tr><td>
                  <Button color="success"
                        //onClick={toggle}
                        ><i class="nc-icon nc-cloud-download-93"></i> Generate PDF
                  </Button>
                  {/* <Modal isOpen={modal}
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
                    </Modal> */}
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
                      <th>Reg_No</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Block Name</th>
                      <th>Hall No</th>
                      <th>Seat No</th>
                      <th>Subject Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td >1</td>
                      <td >20801917</td>
                      <td>4-04-2022</td>
                      <td>09_AM</td>
                      <td>MCA block</td>
                      <td>R1</td>
                      <td>1</td>
                      <td>Digital Principles</td>
                    </tr>
                    <tr>
                      <td >2</td>
                      <td >20801912</td>
                      <td>10-04-2022</td>
                      <td>09_AM</td>
                      <td>MCA Block</td>
                      <td>R1</td>
                      <td>2</td>
                      <td>Computational Mathematics</td>
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
