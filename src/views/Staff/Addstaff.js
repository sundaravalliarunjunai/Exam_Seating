import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Input, Row, Col, FormGroup, Label } from "reactstrap";

export default function Addstaff() {

    return (
        <>
            <div className="content">
                <title>Add Staff Details</title>
                <Form>
                    <Row>
                        <Col>
                            <FormGroup>
                            <Label>Staff Name</Label>
                            <Input
                                name="staffname"
                                placeholder="Staff Name"
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
                                name="staff_dob"
                                placeholder="DOB "
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
                            <Label>Reference</Label>
                            <Input
                                name="ref"
                                placeholder="Reference"
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