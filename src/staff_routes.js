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


  var staff_routes = [
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


export default staff_routes;
