import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Input, Row, Col, FormGroup, Label } from "reactstrap";

export default function Addexam() {

    return (
        <>
            <div className="content">
                <title>Add Examtimetable Details</title>
                <Form>
                <Row>
                        <Col>
                            <FormGroup>
                            <Label>Date</Label>
                            <Input
                                name="date"
                                placeholder="YYYY-MM-DD"
                                type="text" required
                            />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                            <Label>Start Time</Label>
                            <Input
                                name="stime"
                                placeholder=""
                                type="text" required
                            />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                            <Label>End Time</Label>
                            <Input
                                name="etime"
                                placeholder=""
                                type="text" required
                            />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                            <Label>Subject Name</Label>
                            <Input
                                name="sub_name"
                                placeholder="Subject"
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