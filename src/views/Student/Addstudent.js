import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Input, Row, Col, FormGroup, Label } from "reactstrap";

export default function Addstudent() {

    return (
        <>
            <div className="content">
                <title>Add Student Details</title>
                <Form>
                    <Row>
                        <Col>
                            <FormGroup>
                            <Label>Student Name</Label>
                            <Input
                                name="stuname"
                                placeholder="Student Name"
                                type="text" required
                            />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                            <Label>Register Number</Label>
                            <Input
                                name="reg_no"
                                placeholder="Reg"
                                type="text" required
                            />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                            <Label>DOB </Label>
                            <Input
                                name="DOB"
                                placeholder="DOB "
                                type="text" required
                            />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                            <Label>Class</Label>
                            <Input
                                name="class"
                                placeholder="Class"
                                type="text" required
                            />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                            <Label>Department</Label>
                            <Input
                                name="dept"
                                placeholder="Department"
                                type="text" required
                            />
                            </FormGroup>
                        </Col>
                    </Row>
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
                </Form>
            </div>
        </>
    );
}