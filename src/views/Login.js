
import React,{Component} from 'react';
import { useState } from "react";
import { setUserSession } from '../views/Login/Common';
// import logo from '../assets/campusPlanner_Final.png';
import UserService from '../views/Login/Userservice';
import { useHistory } from "react-router";
import { removeUserSession,getUserType } from '../views/Login/Common';
import "./Login.css";
import logo from 'assets/img/admin.jpg';
import {
  Button,
  FormGroup,
  Form,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";

const Login = (props) => {
    const userState = {
        userId:"",
        userName: "",
        userType:"",
        password:"",
        // staffId:"",
        // studentId:"",
};
const history = useHistory();
const [uservalue,setUser]=useState(userState);
const[loading,setLoading]=useState(false);
const[message,setMessage]=useState("");
const[error,setError]=useState("");
const handleInputChange = event => {
    const{name,value}=event.target;
    setUser({...uservalue,[name]:value});
    };
   const submit = (e) =>{
        e.preventDefault();
        const options = {
            headers: {"content-type": "application/json"}
            // headers: {
            //   "Access-Control-Allow-Origin": "http://localhost:8000/api/v1",
            //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            // }
        }
        if(uservalue.userName.length === 0){
           setMessage("Username is required");
        }
        else if(uservalue.password.length === 0){
            setMessage("Password is required");
        }
        else{
           
            setLoading(true);
            UserService.get(uservalue.userName,uservalue.password).then(response => {
                    let userName=response.data.userName;
                    let userId=response.data.userId;
                    let userType=response.data.userType;
                    let staffId=response.data.staffId;
                    let studentId=response.data.studentId;
                    setUserSession(userName,userId,userType,staffId,studentId);
        
                    console.log("response >>>",response);                    
                    if(response.data.length !== 0 && response.status === 200 ){
                      if(userType === 'admin'){
                        history.push("/admin/dashboard");
                      }
                      else if(userType === 'staff')
                      {
                        history.push("/staff_layout/staffDashboard");
                      }
                      else{
                        history.push("/student_layout/studentDashboard");
                      }
                    }
                    else{
                        setLoading(false);
                        history.push("/");
                        setError("Invalid Credentials");    
                        alert("Invalid Credentials");                   
                    }                                
                                           
            }).catch(error => {   
                setLoading(false);          
                setError("Something went wrong");   
            })
        }  
    }

    return(
      <>
        <div className="Login">
          <div className="center"><img src={logo} width='120' height='150' alt="logo" /></div>
          <h2>Login Portal</h2>
          <Form>
            <Row>
              <Col>
                <FormGroup>
                  <Label>Username</Label>
                  <Input type="text" onChange={handleInputChange} name="userName"
                    id="userName" placeholder="Username" value={uservalue.userName} required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label>Password</Label>
                  <Input type="password" onChange={handleInputChange} name="password"
                    id="password" placeholder="Password" value={uservalue.password} required 
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
            <div className="update ml-auto mr-auto">
              <Button className="btn-round" color="primary" onClick={submit}>
                Submit
              </Button>
            </div>
            </Row>
          </Form>
        </div>
      </>
    );
    }
export default Login;