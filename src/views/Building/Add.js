import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Input, Label, Row, Col, FormGroup } from "reactstrap";

export default function Add() {

    return (
        <>
            <div className="content">
                <title>Add Building</title>
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
                            <Label>No of Rooms</Label>
                            <Input
                                name="no_rooms"
                                placeholder="No of Rooms"
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