
import React,{Component} from 'react';
import { useState } from "react";
import { setUserSession } from '../Utils/Common';
import logo from '../assets/campusPlanner_Final.png';
import UserService from '../Services/UserService';
import { useHistory } from "react-router";
import { removeUserSession,getUserType } from '../Utils/Common';

const Login = (props) => {
    const userState = {
        userId:null,
        userName: "",
        userType:"",
        emailId: "",
        password:"",
        staffId:0,
        departmentId:0,
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
        }
        if(uservalue.emailId.length === 0){
           setMessage("Username is required");
        }
        else if(uservalue.password.length === 0){
            setMessage("Password is required");
        }
        else{
           
            setLoading(true);
            UserService.get(uservalue.emailId,uservalue.password).then(response => {
                    let emailId=response.data.emailId;
                    let userId=response.data.userId;
                    let staffId=response.data.staffId;
                    let userType=response.data.userType;
                    let departmentId=response.data.departmentId;
                    setUserSession(emailId,userId,staffId,userType,departmentId);
        
                    console.log("response >>>",response);                    
                    if(response.data.length !== 0 && response.status === 200 ){
                        history.push("/dashboard");
                    }
                    else{
                        setLoading(false);
                        history.push("/");
                        setError("Invalid Credentials");                       
                    }                                
                                           
            }).catch(error => {   
                setLoading(false);          
                setError("Something went wrong");   
            })
        }  
    }

    return(
        
            <div className="container-scroller ">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-center auth px-0">
                    <div className="row w-100 mx-0">
                        <div className="col-lg-5 mx-auto" >
                        <div className="auth-form-light text-center py-5 px-4 px-sm-5" style={{borderRadius:"50px",boxShadow: "2px 2px 3px 3px lightgrey"}}>
                            <div className="brand-logo">
                            <img src={logo} alt="logo" />
                            {/* <br></br>{api.WEB_URL}<br></br>
                            {api.API_URL} */}
                            </div>                                            
                            <form className="mt-0 " style={{display:"inline-block"}}>                                                        
                            <div className="form-group ">
                                <input type="email" className="form-control-width form-control-lg " onChange={handleInputChange} name="emailId"
                                id="exampleInputEmail1" placeholder="Username" value={uservalue.emailId}
                                required style={{textAlign: "center"}}
                                />
                            </div>
                            <div className="form-group ">
                                <input type="password" className="form-control-width form-control-lg " onChange={handleInputChange} name="password"
                                id="exampleInputPassword1" placeholder="Password" value={uservalue.password}
                                required style={{textAlign: "center"}}
                                />
                            </div>
                            <div className="mt-3">
                                <input type="button" className="btn btn-lg btn-blue font-weight-medium auth-form-btn"
                                        value={loading ? "Loading" : "Login"}
                                        disabled={loading}
                                        onClick={submit}          
                                    style={{backgroundColor: "#1F3BB3",fontSize:"0.75rem",paddingLeft:"39%",paddingRight:"39%",paddingTop:"2%",paddingBottom:"2%",color:"#fff"}}
                                />                                   
                            </div>
                            <div className="mt-1 fw-light align-items-center" style={{fontSize:"0.65rem"}}>
                              Version 0.0.1
                            </div>
                            <div className="my-2 d-flex align-items-center">
                            { message.length !=0 && <p className="">{message}</p> } 
                               { error.length !=0 && <p className="">{error}</p> } 
                                    </div>                           
                            <div className="power-logo mt-5" style={{display:"inline-block",fontSize:"0.65rem",marginBottom:"-0.25rem"}}>
                               Powered by<br></br>
                               <img src="../../images/logo/RootNode.png" alt="logo" />
                            </div>
                            </form>                             
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* content-wrapper ends */}
                </div>
                {/* page-body-wrapper ends */}
                </div>
       
    );
    }
export default Login;