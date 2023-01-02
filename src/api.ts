import axios from "axios";

const baseUrl = "http://localhost:8000";
// const baseUrl = "http://18.231.106.33:8000";

export default axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});
