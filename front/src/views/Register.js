import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { Grid, Button, TextField, Alert } from "@material-ui/core";
import API from "../api/api";
import { withCookies, useCookies } from "react-cookie";

function Register(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gamerTag, setGamerTag] = useState("");
  const [error, setError] = useState();

  function _handleSubmit() {
    let api = new API("");
    api.register(mail, password, firstName, lastName, gamerTag).then((data) => {
      console.log(JSON.stringify(data));
      if (data.token) {
        setCookie("token", data.token, "/");
        setCookie("email", data.user.email, "/");
        props.history.push("/home");
      }
      if (data.name === "Error") {
        return alert("Please provide valid email or password greater than 7");
      }
    });
  }

  useEffect(() => {
    if (cookies.token !== "") {
      props.history.push("/home");
      return alert(
        "You already have an account no need to register again. First logout if you want to create a new account"
      );
    }
  }, []);
  return (
    <Grid
      container
      style={{ height: "100%", backgroundColor: "#fffff" }}
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
        label="Password"
        type="password"
        name="password"
        margin="normal"
        variant="outlined"
        onChange={(event) => setPassword(event.target.value)}
      />
      <TextField
        label="First name"
        type="text"
        name="username"
        margin="normal"
        variant="outlined"
        onChange={(event) => setFirstName(event.target.value)}
      />
      <TextField
        label="Last name"
        type="text"
        name="username"
        margin="normal"
        variant="outlined"
        onChange={(event) => setLastName(event.target.value)}
      />
      <TextField
        label="Gamer tag"
        type="text"
        name="username"
        margin="normal"
        variant="outlined"
        onChange={(event) => setGamerTag(event.target.value)}
      />
      <div style={{ margin: 20 }} />
      <Button
        size="large"
        variant="contained"
        color="primary"
        onClick={() => _handleSubmit()}
      >
        Submit
      </Button>
      {/*error && error.map((err: error) => { return (<p key={err.param} style={{color: 'red'}}>{err.msg} {err.param}</p>)}) */}
    </Grid>
  );
}

export default withRouter(Register);
