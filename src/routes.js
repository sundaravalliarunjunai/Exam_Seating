import Dashboard from "views/Dashboard.js";
import Student_dashboard from "views/Student_dashboard";
import Staff from "views/Staff.js";
import Room from "views/Room.js";
import Login from "views/Login.js";
import Subject from "views/Subject.js";
import Student from "views/Student.js";
import Examtimetable from "views/Examtimetable";
import Building from "views/Building";
import Generate from "views/Generate";
import Hall_Allotment from "views/Hall_Allotment";
import Staff_dashboard from "views/Staff_dashboard";
import Staff_Hall_Allotment from "views/Staff_Hall_Allotment";
import {getUserType} from '../src/views/Login/Common';
import { getUser } from "sample/common";
let usertype=getUserType();
//alert(getUserType())

 let uusertype='admin';

if(usertype === "admin"){
  console.log("userType>>",usertype);
  var routes = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: "nc-icon nc-bullet-list-67",
      component: Dashboard,
      layout: "/admin",
    },
    {
      path: "/building",
      name: "Building",
      icon: "nc-icon nc-bank",
      component: Building,
      layout: "/admin",
    },
    {
      path: "/room",
      name: "Room",
      icon: "nc-icon nc-shop",
      component: Room,
      layout: "/admin",
    },
    {
      path: "/subject",
      name: "Subject",
      icon: "nc-icon nc-single-copy-04",
      component: Subject,
      layout: "/admin",
    },
    {
      path: "/staff",
      name: "Staff",
      icon: "nc-icon nc-single-02",
      component: Staff,
      layout: "/admin",
    },
    {
      path: "/student",
      name: "Student",
      icon: "nc-icon nc-hat-3",
      component: Student,
      layout: "/admin",
    },
    {
      path: "/examtimetable",
      name: "Exam Timetable",
      icon: "nc-icon nc-tile-56",
      component: Examtimetable,
      layout: "/admin",
    },
    {
      path: "/generate",
      name: "Generate Report",
      icon: "nc-icon nc-paper",
      component: Generate,
      layout: "/admin",
    },
    {
      path: "/login",
      name: "Login",
      icon: "nc-icon nc-circle-10",
      component: Login,
      layout: "",
    }
  ];

}else if(getUserType() === "staff"){
  console.log("userType>>",usertype);
  routes = [
    {
    path: "/staffDashboard",
    name: "Staff Dashboard",
    icon: "nc-icon nc-bullet-list-67",
    component: Staff_dashboard,
    layout: "/staff_layout",
  },
  {
    path: "/staffHallAllotment",
    name: "Hall Allotment",
    icon: "nc-icon nc-bank",
    component: Staff_Hall_Allotment,
    layout: "/staff_layout",
  },
  {
    path: "/login",
    name: "Logout",
    icon: "nc-icon nc-circle-10",
    component: Login,
    layout: "",
  }
];
}else{
  if(getUserType() === "student"){
    console.log("userType>>",usertype);
    routes = [
      {
      path: "/studentDashboard",
      name: "Student Dashboard",
      icon: "nc-icon nc-bullet-list-67",
      component: Student_dashboard,
      layout: "/student_layout",
    },
    {
      path: "/studentHallAllotment",
      name: "Hall Allotment",
      icon: "nc-icon nc-bank",
      component: Hall_Allotment,
      layout: "/student_layout",
    },
    {
      path: "/login",
      name: "Logout",
      icon: "nc-icon nc-circle-10",
      component: Login,
      layout: "",
    }
  ];
  }

}

export default routes;
