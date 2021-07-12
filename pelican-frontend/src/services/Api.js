import axios from "axios";
import store from "../store/store";

/* export default () => {
  return axios.create({
    baseURL: `http://localhost:3000/api/`,
    headers: {
      Authorization: `${store.state.token}`,
    },
  });
}; */

export default () => {
  return axios.create({
    baseURL: `http://localhost:3000/api/`,
    headers: {
      Authorization: `${store.state.token}`,
      "Content-Type": "application/json",
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Accept, Authorization",
    },
  });
};
