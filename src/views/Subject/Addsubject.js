import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Input, Row, Col, FormGroup, Label } from "reactstrap";

export default function Addsubject() {

    return (
        <>
            <div className="content">
                <title>Add Subject</title>
                <Form>
                    <Row>
                        <Col>
                            <FormGroup>
                            <Label>Course Type</Label>
                            <Input
                                name="ctype"
                                placeholder="Course Type"
                                type="text" required
                            />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                            <Label>Course </Label>
                            <Input
                                name="course"
                                placeholder="Course "
                                type="text" required
                            />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                            <Label>Semester</Label>
                            <Input
                                name="sem"
                                placeholder="Semester"
                                type="text" required
                            />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                            <Label>Subject Code</Label>
                            <Input
                                name="sub_code"
                                placeholder="Subject Code"
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
                                placeholder="Subject Name"
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