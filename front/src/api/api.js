import axios from "axios";
import defaults from "lodash/defaults";

class API {
  constructor(token) {
    this.token = token;

    let credentials = {};
    const config = defaults(credentials, {
      headers: {
        'Content-Type': 'application/json',
                'Accept': 'application/json',
                
                'Access-Control-Allow-Origin' : '*'
      },
    });
    this.axios = axios.create(config);
  }

  login = async (email, password) => {
    try {
      let response = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
      });
      return response.data;
    } catch (err) {
      return err;
    }
  };

  register = async (email, password, firstName, lastName, gamerTag) => {
    try {
      let response = await axios.post("http://localhost:3000/register", {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        gamerTag: gamerTag,
      });
      return response.data;
    } catch (err) {
      return err;
    }
  };

  me = async (email) => {
    try {
      let response = await axios.get("http://localhost:3000/me/" + email, {
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      });
      return response.data;
    } catch (err) {
      return err;
    }
  };
}

export default API;
