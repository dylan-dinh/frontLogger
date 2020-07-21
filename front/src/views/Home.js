import React, { useEffect, useState } from "react";
import { Grid, Button, Box } from "@material-ui/core";
import API from "../api/api";
import { withCookies, useCookies } from "react-cookie";

function HomePage(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [gamer, setGamer] = useState("");
  function disconnect() {
    setCookie("token", "", "/");
    console.log(cookies);
  }
  useEffect(() => {
    if (cookies.token !== "") {
      props.history.push("/home");
    }

    let api = new API(cookies.token);
    const userInfo = async () => {
      const res = await api.me(cookies.email);
      setGamer(res.user.gamerTag);
    };
    userInfo();
  }, []);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Box color="text.primary" clone>
        <p>
          {" "}
          WELCOME {gamer} {}, YOU ARE IN A PRIVATE ROUTE BECAUSE YOU ARE LOGGED
          IN
        </p>
      </Box>
      <Button onClick={disconnect} variant="contained" color="secondary">
        Disconnect
      </Button>
    </Grid>
  );
}

export default withCookies(HomePage);
