
import Nav from './Nav';
import { NavLink,Redirect,useParams } from 'react-router-dom';
import React, { useState,useEffect } from "react";
import { removeUserSession,getUserType } from '../Utils/Common';
import viewsvg from '../assets/view.svg';
import editsvg from '../assets/edit.svg';
import deletesvg from '../assets/delete.svg';
import dashboardsvg from '../assets/dashboard.svg';
import datasvg from '../assets/data.svg';
import semestersvg from '../assets/semesterPlan.svg';
import reportsvg from '../assets/report.svg';
import threedots from '../assets/threedots.svg';
import DepartmentService from '../Services/DepartmentService';
import ClassService from '../Services/ClassService';
import UserService from '../Services/UserService';

    const Departments = () => {
            const user="Admin";
            let i=1;
            
     
    const [getName, setName] = useState(false);
        const handleNameChange = () => {
            setName(!getName);
        }
        {/*Departmentlist*/}
    const departmentState = {
            departmentId:null,
            departmentName: "",
            emailId: "",
            logindeptId:null
        };
    const currentdepartmentState = {
            currentdepartmentId:null,
            currentdepartmentName: "",
            currentemailId: ""
        };
    const deptloginState = {
        departmentId:null,
        emailId:"",
        password:"",
        userType:""
    }
    const [departmentvalue,setDepartment]=useState(departmentState);
    const[submitted,setSubmitted]=useState(false);
    const [departmentlist,setDepartmentlist]=useState([]);
    const [currentdepartment,setcurrentDepartment]=useState(currentdepartmentState);
    const [deptloginvalue,setDeptlogin]=useState(deptloginState);
    let j=1;
    
        useEffect(() => {
            retrieveDepartment();
        }, []);
    
    const handleInputChange=event => {
            const{name,value}=event.target;
            setDepartment({...departmentvalue,[name]:value});
        };
    const currenthandleInputChange=event => {
            const{name,value}=event.target;
            setcurrentDepartment({...currentdepartment,[name]:value});
        };
    const saveDepartment = (e) => {
            e.preventDefault();
            var data= {
                departmentName: departmentvalue.departmentName,
                emailId: departmentvalue.emailId,
                
                
        };
            alert(data);
            DepartmentService.create(data)
                .then(response => {
            alert("Success");
            setDepartment({
                departmentId: response.data.departmentId,
                departmentName: response.data.departmentName,
                emailId: response.data.emailId,
            });
            var data={
                password:departmentvalue.emailId,
                userType:"DepartmentAdmin",
                departmentId: response.data.departmentId,
                emailId: departmentvalue.emailId,
            };
            UserService.create(data)
            .then (response=>{
                setDeptlogin({
                    departmentId:response.data.departmentId,
                    emailId:response.data.emailId,
                    password:response.data.password,
                    userType:response.data.userType
            });
        })
                setSubmitted(true);
                console.log(response.data);
                retrieveDepartment();
                newDepartment();
             })
            .catch(e=>{
                alert(e);
                console.log(e);
            });
            
        };
        const newDepartment = () => {
            setDepartment(departmentState);
            setSubmitted(false);
        };
        const retrieveDepartment =() => {
            DepartmentService.getAll().then(response => {
            setDepartmentlist(response.data);
            console.log(response.data);
        })
            .catch(e => {
            console.log(e);
        });
        };
        const updateDepartment = (e) => {
            e.preventDefault();
            var data= {
                departmentName: currentdepartment.currentdepartmentName,
                emailId: currentdepartment.currentemailId
            };
                alert(data);
                DepartmentService.update(currentdepartment.currentdepartmentId,data).
                then(response => {
                console.log(response.data);
                alert("Success");
                retrieveDepartment();            
            })
                .catch(e => {
                console.log(e);
            });
        };
        const getDepartment = (id) => {
                DepartmentService.get(id).then(response => {
                setcurrentDepartment({
                currentdepartmentId:response.data.departmentId,
                currentdepartmentName:response.data.departmentName,
                currentemailId:response.data.emailId
            });
            console.log(response.data);
            })
            .catch(e => {
                console.log(e);
        });

        };
        const deleteDepartment = (id) => {
            DepartmentService.remove(id). then (
            response => {
                alert('Deleted Successfully...');           
            retrieveDepartment();           
        })
        UserService.getAll().then((response)=>{
            response.data.filter(obj=>obj.departmentId === id).map((val)=>
             UserService.remove(val.userId) .then (
                 response => {}
            )
             )
        })   
            .catch(e => {
            console.log(e);
        });
    };
    {/*Classlist*/}
    const [getClass, setClass] = useState(false);
    const handlebuttonChange = () => {
        setClass(!getClass);
    }
    const classState = {
        classId:null,
        className: "",
        classType: "",
        departmentId:0
    };
    const currentclassState = {
            currentclassId:null,
            currentclassName: "",
            currentclassType: "",
            currentdepartmentId:0
    };
    const [classvalue,setclassvalue]=useState(classState);
    const[classsubmitted,setclassSubmitted]=useState(false);
    const [classlist,setClasslist]=useState([]);
    const [currentclass,setcurrentClass]=useState(currentclassState);
        useEffect(() => {
        retrieveClass();
    }, [] );
    const handleclassInputChange=event => {
    const{name,value}=event.target;
        setclassvalue({...classvalue,[name]:value});
    };
    const currenthandleclassInputChange=event => {
    const{name,value}=event.target;
        setcurrentClass({...currentclass,[name]:value});
    };
    const saveClass = (e,id) => {
        e.preventDefault()
    var data= {
            departmentId:id,
            className: classvalue.className,
            classType:classvalue.classType
    };
        alert(data);
        ClassService.create(data)
            .then(response => {
            alert("Success");
        setclassvalue({
            classId: response.data.classId,
            className: response.data.className,
            classType: response.data.classType,
            departmentId:response.data.departmentId
        });
        setclassSubmitted(true);
        console.log(response.data);
        retrieveClass();
        newClass();
    })
        .catch(e=>{
            alert(e);
            console.log(e);
    });
    };
    const newClass = () => {
    setclassvalue(classState);
    setclassSubmitted(false);
    };
    const retrieveClass =() => {
        ClassService.getAll().then(response => {
        setClasslist(response.data);
        console.log(response.data);
    })
    .catch(e => {
        console.log(e);
    });
    };
    const updateClass = (e) => {
        e.preventDefault();
        var data= {
            className: currentclass.currentclassName,
            classType: currentclass.currentclassType,
            departmentId:currentclass.currentdepartmentId
    };
        alert(data);
        ClassService.update(currentclass.currentclassId,data).
        then(response => {
            console.log(response.data);
            alert("Success");
            retrieveClass();            
        })
    .catch(e => {
    console.log(e);
        });
    };
    const getcurrentClass = (id) => {
        ClassService.get(id).then(response => {
        setcurrentClass({
            currentdepartmentId:response.data.departmentId,
            currentclassId:response.data.classId,
            currentclassName:response.data.className,
            currentclassType:response.data.classType
        });
    console.log(response.data);
    })
    .catch(e => {
        console.log(e);
    });
    };
    const deleteClass = (id) => {
    ClassService.remove(id). then (
        response => {
        retrieveClass();  
        alert('Deleted Successfully...');          
    })
    .catch(e => {
        console.log(e);
    });
    };
    
    const userType = getUserType();
    console.log("userType>>",userType);
    if (!userType) {
        return <Redirect to="/login" />
    }
   
    function setJvalue(){
       j=1
    }
    return(
        <div>
            <Nav></Nav>
            <div className="page-body-wrapper">
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
            { user ==="Admin" &&
                <ul className="nav">
                
                <li className="nav-item ">
                    <a className="nav-link" >
                        <img src="/images/icons/9.png" height="25" width="25" style={{margin:"5px 5px"}}/>
                        <NavLink exact activeClassName="active" to="/dashboard"> <span className="menu-title">Dashboard</span></NavLink>                                                                         
                    </a>
                </li>  
               
                <li class="nav-item nav-category"><img src="/images/icons/10.png" height="25" width="25" style={{margin:"5px 5px"}}/>Data</li>
                <li class="nav-item"> 
          
                <a className="nav-link" >
                        <img src="/images/icons/11.png" height="25" width="25" style={{margin:"5px 5px"}}/>
                        <NavLink exact activeClassName="active"  to="/Semester"> <span className="menu-title">Semester</span></NavLink>                                                                         
                </a>
                </li>  
                <li class="nav-item active">  
                <a className="nav-link" >
                        <img src="/images/icons/22.jpg" height="25" width="25" style={{margin:"5px 5px"}}/>
                        <NavLink exact activeClassName="active" to="/Departments"> <span className="menu-title">Departments</span></NavLink>                                                                         
                    </a>
                </li> 
                <li class="nav-item">  
                <a className="nav-link" >
                        <img src="/images/icons/33.png" height="25" width="25" style={{margin:"5px 5px"}}/>
                        <NavLink exact activeClassName="active" to="/Infrastructure"> <span className="menu-title">Infrastructure</span></NavLink>                                                                         
                 </a>
                </li>  
                <li class="nav-item">  
                <a className="nav-link" >
                        <img src="/images/icons/44.png" height="25" width="25" style={{margin:"5px 5px"}}/>
                        <NavLink exact activeClassName="active" to="/Staff"> <span className="menu-title">Staff</span></NavLink>                                                                         
                    </a>
                </li>   
                <li class="nav-item">  
                <a className="nav-link" >
                        <img src="/images/icons/55.png" height="25" width="25" style={{margin:"5px 5px"}}/>
                        <NavLink exact activeClassName="active" to="/Subject"> <span className="menu-title">Subject</span></NavLink>                                                                         
                    </a>
                </li>   
                <li class="nav-item">  
                <a className="nav-link" >
                        <img src="/images/icons/66.png" height="25" width="25" style={{margin:"5px 5px"}}/>
                        <NavLink exact activeClassName="active" to="/FixedSlot"> <span className="menu-title">Fixed Slots</span></NavLink>                                                                         
                </a>
                
                </li>
                <li class="nav-item nav-category"><img src="/images/icons/12.png" height="25" width="25" style={{margin:"5px 5px"}}/>SemesterPlan</li>
          <li class="nav-item"> 
          
          <a className="nav-link" >
                    {/* <i className="mdi mdi-apps menu-icon" />                                      */}
                        <img src="/images/icons/13.png" height="25" width="25" style={{margin:"5px 5px"}}/>
                        <NavLink exact activeClassName="active"  to="/Interdepartment"> <span className="menu-title">Interdepartment</span></NavLink>                                                                         
                    </a>
                </li>  
                <li class="nav-item"> 
          
          <a className="nav-link" >
                    {/* <i className="mdi mdi-apps menu-icon" />                                      */}
                        <img src="/images/icons/11.png" height="25" width="25" style={{margin:"5px 5px"}}/>
                        <NavLink exact activeClassName="active"  to="/Intradepartment"> <span className="menu-title">Intradepartment</span></NavLink>                                                                         
                    </a>
                </li>       
                </ul>
                }
                { user === "DeptAdmin" &&
                
                <ul className="nav">
                
                <li className="nav-item active">
                    <a className="nav-link" >
                        <img src="/images/icons/9.png" height="25" width="25" style={{margin:"5px 5px"}}/>
                        <NavLink exact activeClassName="active" to="/dashboard"> <span className="menu-title">Dashboard</span></NavLink>                                                                         
                    </a>
                </li>  
               
                <li class="nav-item nav-category"><img src="/images/icons/10.png" height="25" width="25" style={{margin:"5px 5px"}}/>Data</li> 
                <li class="nav-item">  
                <a className="nav-link" >
                        <img src="/images/icons/55.png" height="25" width="25" style={{margin:"5px 5px"}}/>
                        <NavLink exact activeClassName="active" to="/Subject"> <span className="menu-title">Subject</span></NavLink>                                                                         
                    </a>
                </li> 
                <li class="nav-item">  
                <a className="nav-link" >
                        <img src="/images/icons/44.png" height="25" width="25" style={{margin:"5px 5px"}}/>
                        <NavLink exact activeClassName="active" to="/Staff"> <span className="menu-title">Staff</span></NavLink>                                                                         
                    </a>
                </li>  

                </ul> 
                }
                </nav>

                <div className="main-panel">
           
                <div className="content-wrapper">
                <div className="row">
                    <div className="col-sm-12">
                    <div className="home-tab">
                        <div className="d-sm-flex align-items-center justify-content-between">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="department-tab" data-bs-toggle="tab" href="#department" role="tab" aria-controls="department" aria-selected="true">Department</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link" id="class-tab" data-bs-toggle="tab" href="#class" role="tab" aria-selected="false" >Class</a>
                            </li>
                        </ul>
                        </div>
                        <div className="tab-content tab-content-basic">
                        <div className="tab-pane fade show active" id="department" role="tabpanel" aria-labelledby="department"> 
                        <div className="row">
                            <div className="d-flex flex-column">
                                <div className="row flex-grow">
                                    <div className="col-12 col-lg-4 col-lg-12 grid-margin stretch-card">
                                    <div className="card card-rounded">
                                    <div className="card-body">
                                        <div class="accordion accordion-flush" id="accordionExample">
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="headingOne">
                                            <div class="d-md-flex justify-content-md-end">
                                            <button onClick={handlebuttonChange} class="w3-button btn btn-blue btn-rounded me-md-5" type="button" data-bs-toggle="collapse" data-bs-target="#sampleOne" aria-expanded="false" aria-controls="collapseOne">
                                                            {getName?'Close':'+Add Department'}   
                                            </button>
                                            </div>
                                            </h2>
                                                    <div id="sampleOne" class="accordion-collapse collapse  " aria-labelledby="headingOne">
                                        <div class="card card-body">
                                        <form class="form-inline" onSubmit={saveDepartment}>
                                            <div class="row g-4">
                                                <div class="col-md-6">
                                                <div class="col-auto">
                                                    <label class="lbl">Department name</label>
                                                </div> 
                                                <div class="col-auto">
                                                    <input class="form-control" type="text" placeholder='Enter here' onChange={handleInputChange} value={departmentvalue.departmentName} name="departmentName" required/>
                                                </div>
                                                </div>
                                                <div class="col-md-6">
                                                <div class="col-auto">
                                                    <label class="lbl">Email id</label>
                                                </div> 
                                                <div class="col-auto">
                                                    <input class="form-control" type="email" placeholder='Enter here' onChange={handleInputChange} value={departmentvalue.emailId} name="emailId" required/>
                                                </div>
                                                </div>
                                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">                                      
                                                    <input type="submit" className="btn btn-blue me-2 btn-rounded btn-fw" value="Submit"/>
                                                    <button onClick={newDepartment} type="button" className="btn btn-outline-dark me-2 btn-rounded">Reset</button>                                        
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            </div>
                                       
                            <div className="table-responsive" >
                                <table className="table" >
                                <thead>
                                    <tr class="text-center">
                                    <th>
                                        #
                                    </th>
                                    <th>
                                        Department name
                                    </th>
                                    <th>
                                        Email id
                                    </th>
                                    <th>
                                        Actions
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>   
                                {
                                    departmentlist.map(result=>(   
                                    <tr class="text-center">
                                        <td>{i++}</td>
                                        <td>{result.departmentName}</td>
                                        <td>{result.emailId}</td>
                                        <td>                                             
                                            <img src={threedots} id="btnGroupDrop1" type="button" class="btn  dropdown-toggle threeimage-size" data-bs-toggle="dropdown" aria-expanded="false"/>
                                            <ul class="dropdown-menu  actiondrop" aria-labelledby="btnGroupDrop1">
                                                 <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={( () => getDepartment(result.departmentId) )}><img src={editsvg} class="dropimage-size" />Edit</a></li>
                                                <li><a class="dropdown-item" href="#" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this department?')) deleteDepartment(result.departmentId) } }><img src={deletesvg} class="dropimage-size"/>Delete</a></li>
                                            </ul>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        <div className="tab-pane fade show" id="class" role="tabpanel" aria-labelledby="class"> 
                            <div className="row">
                                <div className="d-flex flex-column">
                                <div className="row flex-grow">
                                    <div className="col-12 col-lg-4 col-lg-12 grid-margin stretch-card">
                                        <div className="card card-rounded">
                                        <div className="card-body">
                                       
                                        <div class="accordion" id="accordionExample">
                                        {setJvalue} 
                                        { 
                                            departmentlist.map(result=>(
                                                
                                            <div class="accordion-item">
                                            <h2 class="accordion-header" id="headingOne">
                                                <button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target={"#demo" + result.departmentId} aria-expanded="false" aria-controls="collapseOne">
                                                    {result.departmentName}
                                                </button>
                                            </h2>
                                            <div id={"demo" + result.departmentId} class="accordion-collapse collapse" aria-labelledby="headingOne" >
                                            <div class="accordion-body">
                                                <div class="accordion accordion-flush" id="accordionExample">
                                                <div class="accordion-item">
                                                    <h2 class="accordion-header" id="headingOne">
                                                    <div class="d-md-flex justify-content-md-end">
                                                        <button onClick={handlebuttonChange} class="w3-button btn btn-blue btn-rounded me-md-5" type="button" data-bs-toggle="collapse" data-bs-target={"#sample" + result.departmentId}  aria-expanded="false" aria-controls="collapsetwo">
                                                            {getClass?'Close':'+Add Class'}   
                                                        </button>
                                                    </div>
                                                    </h2>
                                                    <div id={"sample" + result.departmentId} class="accordion-collapse collapse  " aria-labelledby="headingtwo">
                                                    <div class="card card-body">
                                                    <form class="form-inline pb-3 pt-3" onSubmit={(e) => { saveClass(e,result.departmentId);}}>
                                                        <div class="row g-4 ">
                                                            <div class="col-md-6">
                                                            <div class="col-auto">
                                                                <label class="lbl">Class name</label>
                                                            </div> 
                                                            <div class="col-auto">
                                                                <input onChange={handleclassInputChange} value={classvalue.className} name="className" class="form-control" type="text" placeholder='Enter here' required/>
                                                            </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                            <div class="col-auto">      
                                                                <label class="lbl">Type</label> 
                                                            </div>
                                                            <div class="col-auto"> 
                                                                <select className="form-control" id="classType" name="classType" onChange={handleclassInputChange} required>
                                                                    <option value="0">--select type--</option>
                                                                    <option value="UG" name="classType">UG</option>
                                                                    <option value="PG" name="classType">PG</option>                                                        
                                                                </select>
                                                            </div>
                                                            </div>
                                                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">                                      
                                                        <input type="submit" className="btn btn-blue me-2 btn-rounded btn-fw"value="Submit"/>
                                                        <button onClick={newClass} type="button" className="btn btn-outline-dark me-2 btn-rounded">Reset</button>                                         
                                                        </div>
                                                        </div>
                                                </form>
                                                </div>
                                            </div>
                                            </div>
                                    </div>
                                    <div className="table-responsive">
                                    <table className="table" >
                                        <thead >
                                        <tr class="text-center">
                                        <th>
                                            #
                                        </th>
                                        <th>
                                            Class name
                                        </th>
                                        <th>
                                            Type
                                        </th>
                                        <th>
                                            Actions
                                        </th>
                                        </tr>
                                    </thead>
                                    <tbody>  
                                        
                                        { classlist.filter(obj => obj.departmentId === result.departmentId).map(re=>( 
                                            <tr class="text-center">                      
                                                <td>{j++}</td>
                                                <td>{re.className}</td>
                                                <td>{re.classType}</td>
                                                <td>                                             
                                                <img src={threedots} id="btnGroupDrop1" type="button" class="btn  dropdown-toggle threeimage-size" data-bs-toggle="dropdown" aria-expanded="false"/>
                                                    <ul class="dropdown-menu  actiondrop" aria-labelledby="btnGroupDrop1">
                                                        <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={( () => getcurrentClass(result.classId) )}><img src={editsvg} class="dropimage-size" />Edit</a></li>
                                                        <li><a class="dropdown-item" href="#" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this class?')) deleteClass(result.classId) } }><img src={deletesvg} class="dropimage-size" />Delete</a></li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        ))}  
                                     
                                    </tbody>
                                </table>
                            </div>
                            </div>
                            </div>
                            </div>
                            
                                ))
                                }
                            </div>    
                        </div>
                    </div>
                    </div>

            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
                            {/*Department Modal*/}
                                            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModal" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                    <form className="forms-sample">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModal"> Edit Department</h5>
                                                    <button  type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">                                                    
                                                    <div className="form-group"> 
                                                    <label class="lbl">Department Name</label>                                                   
                                                    <input class="form-control" type="text" placeholder='Enter here' onChange={currenthandleInputChange} value={currentdepartment.currentdepartmentName} name="currentdepartmentName" required/>
                                                    </div>
                                              
                                                    <div className="form-group">
                                                    <label class="lbl">Email Id</label>                                                        
                                                    <input class="form-control" type="email" placeholder='Enter here' onChange={currenthandleInputChange} value={currentdepartment.currentemailId} name="currentemailId" required/>
                                                    </div>    
                                                                                                                                                                                       
                                                </div>
                                                <div className="modal-footer">                                                    
                                                    <button  className="btn btn-blue me-2 btn-rounded btn-fw"   onClick={updateDepartment}>Update</button>                                        
                                                </div>
                                                </form>
                                                    </div>
                                                </div>
                                            </div>
                            {/*Class Modal*/}
                                            <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModal2" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                    <form className="forms-sample">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModal2">Edit Class</h5>
                                                    <button  type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <p></p>                                                    
                                                    <div className="form-group"> 
                                                    <label class="lbl">Class Name</label>                                                   
                                                    <input class="form-control" type="text" placeholder='Enter here' onChange={currenthandleclassInputChange} value={currentclass.currentclassName} name="currentclassName" required/>
                                                    </div>
                                              
                                                    <div className="form-group">
                                                    <label class="lbl">Class Type</label>                                                        
                                                    <select className="form-control" id="currentclassType" name="currentclassType" onChange={currenthandleclassInputChange} required>
                                                        <option value="0">--select type--</option>
                                                        <option value="UG" name="classType">UG</option>
                                                        <option value="PG" name="classType">PG</option>                                                        
                                                    </select>
                                                    </div>    
                                                                                                                                                                                       
                                                </div>
                                                <div className="modal-footer">                                                    
                                                    <button  className="btn btn-blue me-2 btn-rounded btn-fw"   onClick={updateClass} >Update</button>                                        
                                                </div>
                                                </form>
                                                    </div>
                                                </div>
                                            </div>
                                        <footer className="footer">
                                            <div className="d-sm-flex justify-content-center justify-content-sm-between">
                                                <span className="text-muted text-center text-sm-left d-block d-sm-inline-block"> </span>
                                                <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-left"><a href="#/" target="_blank">Root Node India (P) Limited</a><br></br>Copyright © 2021. All rights reserved.</span>
                                            </div>
                                        </footer>
                                    </div>
                </div>
  </div>
);
}
export default Departments;
