import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

function Staff_dashboard() {
  return (
    <>
      <div className="content">
      <Row>
          <Col lg="4" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i class="nc-icon nc-ruler-pencil"></i>
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Number of Exam Days</p>
                      <CardTitle tag="p">6</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i class="nc-icon nc-shop"></i>
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Number Of Rooms Allocated</p>
                      <CardTitle tag="p">6</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div></div>
      </div>
    </>
  );
}

export default Staff_dashboard;
