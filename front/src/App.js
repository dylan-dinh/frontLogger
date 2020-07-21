import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./views/PrivateRoute";
import Login from "./views/Login";
import Home from "./views/Home";
import RegisterPage from "./views/Register";
import { withCookies, useCookies } from "react-cookie";

function App(props) {
  return (
    <div className="App">
      <Router>
        <Route path="/login" component={Login} />
        <Route path="/register" component={RegisterPage} />
        <PrivateRoute path="/home" component={Home} />
        <Redirect exact from="/" to="/login" />
      </Router>
    </div>
  );
}

export default withCookies(App);
