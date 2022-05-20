
import axios from "axios";
let API_URL=""
let WEB_URL=window.location.hostname;
if(WEB_URL === 'localhost'){
    API_URL='http://localhost:8000/api/v1';
}
else if(WEB_URL === 'vvvtest.rootnode.in'){
    API_URL='http://52.66.216.10:8000/api/v1';
}
else if(WEB_URL === 'vvv.rootnode.in'){
    API_URL='http://52.66.216.10:8000/api/v1';
}

export default axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json"
  }
});