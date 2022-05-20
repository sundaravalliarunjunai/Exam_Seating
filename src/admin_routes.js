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
//import {getUserType} from '../src/views/Login/Common';
import { getUser } from "sample/common";



  var admin_routes = [
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




export default admin_routes;
