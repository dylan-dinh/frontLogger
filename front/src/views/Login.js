import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import Button from "@material-ui/core/Button";
import { Grid, TextField } from "@material-ui/core";
import API from "../api/api";
import { Link, Redirect } from "react-router-dom";
import { withCookies, useCookies } from "react-cookie";

function LoginPage(props) {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  function _handleSubmit() {
    let api = new API("");
    api.login(mail, password).then((data) => {
      console.log(data);
      if (data.token) {
        setCookie("token", data.token, "/");
        setCookie("email", data.user.email, "/");
        props.history.push("/home");
      }
      if (data.name === "Error") {
        return alert("Wrong credentials");
      }
    });
  }

  useEffect(() => {
    if (cookies.token !== "") {
      props.history.push("/home");
      return alert("You are already logged in no need to login again.");
    }
  }, []);

  return (
    <Grid
      container
      style={{ backgroundColor: "#ffffff" }}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <TextField
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        margin="normal"
        variant="outlined"
        onChange={(event) => setMail(event.target.value)}
      />
      <TextField
        style={{ border: "20px" }}
        label="Password"
        type="password"
        name="password"
        margin="normal"
        variant="outlined"
        onChange={(event) => setPassword(event.target.value)}
      />
      <div style={{ margin: 20 }} />
      <Button
        size="large"
        variant="contained"
        color="primary"
        onClick={() => _handleSubmit()}
      >
        LOGIN
      </Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ margin: 20 }} />
      <Link style={{ color: "black" }} to="/register">
        REGISTER
      </Link>
      <Link style={{ color: "black" }} to="/home">
        HOME
      </Link>
    </Grid>
  );
}

export default withCookies(LoginPage);
