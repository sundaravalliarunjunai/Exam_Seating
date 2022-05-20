import Student_dashboard from "views/Student_dashboard";
import Login from "views/Login.js";
import Hall_Allotment from "views/Hall_Allotment";

    var student_routes = [
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


export default student_routes;
