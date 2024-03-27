import axios from "axios";

export default axios.create({
    baseURL: "http://18.136.213.130/",  
    headers: {"skip-browser-warning": "true"}
});
