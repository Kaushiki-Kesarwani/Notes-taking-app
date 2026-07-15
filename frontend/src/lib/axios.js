import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5002/api",
  withCredentials: true, //withCredentials: true tells Axios to include cookies with requests.
});

export default api; 