import axios from "axios";

 const config = {
   withCredentials: true,
   headers: {
     "Access-Control-Allow-Origin": "*",
     "Content-Type": "application/json",
   },
 };
const Request = axios.create({
  baseURL: "http://localhost:5000/api/",config,
});

export default Request;