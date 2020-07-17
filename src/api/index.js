import axios from "axios";

const token = sessionStorage.getItem("token");

export default axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  Authorization: token
});
