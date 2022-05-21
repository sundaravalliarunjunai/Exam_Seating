import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Input, Row, Col, FormGroup, Label } from "reactstrap";


export default function Addroom() {

    return (
        <>
            <div className="content">
                <title>Add Room</title>
                <Form>
                    <Row>
                        <Col>
                            <FormGroup>
                            <Label>Building Name</Label>
                            <Input
                                name="bname"
                                placeholder="Building Name"
                                type="text" required
                            />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                            <Label>Room Number</Label>
                            <Input
                                name="r_no"
                                placeholder="Room Number"
                                type="text" required
                            />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                            <Label>Number of Seats</Label>
                            <Input
                                name="no_seats"
                                placeholder="No of Seats"
                                type="text" required
                            />
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    );
}