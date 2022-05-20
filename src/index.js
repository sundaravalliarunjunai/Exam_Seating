import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";
import StaffLayout from "layouts/Staff_layout.js";
import StudentLayout from "layouts/Student_layout.js"
import Login from "views/Login";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* <Route path="/" component={Login} element={<Login/>} /> */}
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/staff_layout" render={(props) => <StaffLayout {...props} />} />
      <Route path="/student_layout" render={(props) => <StudentLayout {...props} />} />
      <Route path="/login" component={Login} />
      <Route exact path="/" component={Login} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
