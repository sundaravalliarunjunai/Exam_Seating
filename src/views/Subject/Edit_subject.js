import React,{useEffect,useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Input, Label, Row, Col, FormGroup, Button } from "reactstrap";
import SubjectService from "./Subjectservice";
import UserService from "views/Login/Userservice";

export default function Edit_subject() {
  
    const subjectState = {
      subjectId:null,
      subjectName: "",
    };
  
    const currentsubjectState = {
      currentsubjectId:null,
      currentsubjectName: "",
    };
  
    const [subjectvalue,setSubject]=useState(subjectState);
    const[submitted,setSubmitted]=useState(false);
    const [subjectlist,setSubjectlist]=useState([]);
    const [currentsubject,setcurrentSubject]=useState(currentsubjectState);
  
    useEffect(() => {
      retrieveSubject();
    }, []);
  
    const handleInputChange=event => {
      const{name,value}=event.target;
      setSubject({...subjectvalue,[name]:value});
    };
    const currenthandleInputChange=event => {
      const{name,value}=event.target;
      setcurrentSubject({...currentsubject,[name]:value});
    };
    const saveSubject = (e) => {
      e.preventDefault();
      var data= {
          subjectId: subjectvalue.subjectId,
          subjectName: subjectvalue.subjectName,     
      };
      //alert(data);
        SubjectService.create(data).then(response => {
          alert("Success");
          setSubject({
            subjectId: response.data.subjectId,
            subjectName: response.data.subjectName,
          });
          setSubmitted(true);
                  console.log(response.data);
                  retrieveSubject();
                  newSubject();
        })
        .catch(e=>{
          alert(e);
          console.log(e);
        });
    };
    const newSubject = () => {
      setSubject(subjectState);
      setSubmitted(false);
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
    const updateSubject = (e) => {
        e.preventDefault();
        var data= {
            subjectName: currentsubject.currentsubjectName,
        };
            //alert(data);
            SubjectService.update(currentsubject.currentsubjectId,data).
            then(response => {
            console.log(response.data);
            alert("Success");
            retrieveSubject();            
        })
            .catch(e => {
            console.log(e);
        });
    };
    const getSubject = (id) => {
            SubjectService.get(id).then(response => {
            setcurrentSubject({
            currentsubjectId:response.data.subjectId,
            currentsubjectName:response.data.subjectName,
        });
        console.log(response.data);
        })
        .catch(e => {
            console.log(e);
    });
  
    };
    const deleteSubject = (id) => {
        SubjectService.remove(id). then (
        response => {
            alert('Deleted Successfully...');           
        retrieveSubject();           
    })
    UserService.getAll().then((response)=>{
        response.data.filter(obj=>obj.subjectId === id).map((val)=>
        UserService.remove(val.userId) .then (
            response => {}
        )
        )
    })   
        .catch(e => {
        console.log(e);
    });
    };
  
    
    const handlebuttonChange = () => {
      setSubject(!getSubject);
    }

    // Modal open state
    const [modal, setModal] = React.useState(false);
  
    // Toggle for Modal
    const toggle = () => setModal(!modal);

    return (
        <>
            <div className="content">
                <title>Edit Subject</title>
                <Form >
                    <Row>
                        <Col>
                            <FormGroup>
                            <Label>Subject Name</Label>
                            <Input
                                name="currentsubjectName"
                                onChange={currenthandleInputChange}
                                value={currentsubject.currentsubjectName}
                                type="text" required
                            />
                            </FormGroup>
                            <Button color="primary" onClick={updateSubject}>{toggle}Update</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    );
}