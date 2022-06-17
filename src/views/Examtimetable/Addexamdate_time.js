import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Input, Row, Col, FormGroup, Label } from "reactstrap";
import DepartmentService from "views/Department/DepartmentService";
import SubjectService from "views/Subject/Subjectservice";
import ExamDateAndTimeService from "./ExamDateAndTimeService";

export default function Addexamdate_time() {

    const examDateAndTimeState = {
        examDateAndTimeId:null,
        examDateId:"",
        examNoonType:"",
        subjectId:"",
    };
    
    const currentexamDateAndTimeState = {
        currentexamDateAndTimeId:null,
        currentexamDateId:"",
        currentexamNoonType:"",
        currentsubjectId:"",
    };

    useEffect(() => {
        retrieveExamDateAndTime();
        retrieveDepartment();
        retrieveSubject();
    }, []);

    const [departmentlist,setDepartmentlist]=useState([]);
    const [subjectlist,setSubjectlist]=useState([]);
    const[show,setShow] = useState(true);
    const[submitted,setSubmitted]=useState(false);
    const [examDateAndTimelist,setExamDateAndTimelist]=useState([]);
    const [currentexamDateAndTime,setcurrentExamDateAndTime]=useState(currentexamDateAndTimeState);
    const [examDateAndTimevalue,setExamDateAndTime]=useState(examDateAndTimeState);
    const [departmentId,setDepartmentId]=useState([]);

    const handleInputChange=event => {
        const{name,value}=event.target;
        setExamDateAndTime({...examDateAndTimevalue,[name]:value});
    };
    const currenthandleInputChange=event => {
        const{name,value}=event.target;
        setcurrentExamDateAndTime({...currentexamDateAndTime,[name]:value});
    };
    const saveExamDateAndTime = (e) => {
        e.preventDefault();
        var data= {
            examDateAndTimeId:examDateAndTimevalue.examDateAndTimeId,
            examDateId:examDateAndTimevalue.examDateId,
            examNoonType:examDateAndTimevalue.examNoonType,
            subjectId:examDateAndTimevalue.subjectId,
        };
        // alert(data);
        ExamDateAndTimeService.create(data).then(response => {
            alert("Success");
            setExamDateAndTime({
                examDateAndTimeId: response.data.examDateAndTimeId,
                examDateId:response.data.examDateId,
                examNoonType:response.data.examNoonType,
                subjectId:response.data.subjectId,
            });
            setSubmitted(true);
            console.log(response.data);
            retrieveExamDateAndTime();
            newExamDateAndTime();
        })
        .catch(e=>{
            alert(e);
            console.log(e);
        });
    };
      
    const newExamDateAndTime = () => {
        setExamDateAndTime(examDateAndTimeState);
        setSubmitted(false);
    };

    const retrieveExamDateAndTime =() => {
        ExamDateAndTimeService.getAll().then(response => {
        setExamDateAndTimelist(response.data);
          // console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };
    
    const retrieveDepartment =() => {
        DepartmentService.getAll().then(response => {
        setDepartmentlist(response.data);
        // console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    const retrieveSubject =() => {
        SubjectService.getAll().then(response => {
        setSubjectlist(response.data);
        // console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };
    
    function getDepartmentName(id){
        return departmentlist.filter(obj=> Number(obj.departmentId) === Number(id)).map(result=>{
          return result.departmentName;
        })
    }

    return (
        <>
            <div className="content">
                <title>Add Exam Details</title>
                <Form onSubmit={saveExamDateAndTime}>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label>Department</Label>
                                <Input
                                    type={"select"}
                                    name="departmentId"
                                    onChange={handleInputChange}
                                    value={departmentlist.departmentId}
                                >
                                    {departmentlist.map(result =>(
                                        <option value={result.departmentId} onClick={()=>setShow(true)} >{result.departmentName}</option>
                                    ))}
                                </Input>
                                <Input
                                    type={"select"}
                                    name="subjectId"
                                    onChange={handleInputChange}
                                    value={examDateAndTimevalue.subjectId}
                                >
                                    show ?
                                    {subjectlist.map(result =>(
                                        (departmentlist.departmentId == result.departmentId)?
                                            <option value={result.subjectId}>{result.subjectName}</option>:
                                            <option ></option>
                                    ))} : null
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    );
}