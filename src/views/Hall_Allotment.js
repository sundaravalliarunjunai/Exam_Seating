import React from "react";
import {
  Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button,
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link } from "react-router-dom";

export default function Hall_Allotment() {

  return (
    <>
      <div className="content">
      <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Hall Allocated</CardTitle>
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
                      <td >20801917</td>
                      <td>10-04-2022</td>
                      <td>09_AM</td>
                      <td>MCA Block</td>
                      <td>R3</td>
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
