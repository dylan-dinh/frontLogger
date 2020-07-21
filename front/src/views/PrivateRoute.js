import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withCookies, useCookies } from "react-cookie";
import { fromPairs } from "lodash";

// @ts-ignore
function PrivateRoute({ component: Component, ...rest }) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  return (
    <Route
      {...rest}
      render={(props) =>
        cookies.token !== "" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default withCookies(PrivateRoute);
