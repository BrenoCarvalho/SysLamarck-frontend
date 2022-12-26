import axios from "axios";

// const baseUrl = "http://localhost:8000";
const baseUrl = "http://15.229.15.44:8000";

export default axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});
