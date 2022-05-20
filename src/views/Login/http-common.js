import axios from "axios";
let API_URL=""
let WEB_URL=window.location.hostname;
if(WEB_URL === 'localhost'){
    API_URL='http://localhost:8000/api/v1';
}

export default axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json"
  }
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    // }
});