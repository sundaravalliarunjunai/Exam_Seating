import axios from "axios";
let API_URL=""
let WEB_URL=window.location.hostname;
if(WEB_URL === 'localhost'){
  API_URL='http://3.111.43.133:8080/api/v1';
}

export default axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json"
  }
   
});