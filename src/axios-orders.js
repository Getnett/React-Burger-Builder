import axios from "axios";

const instance = axios.create({
  baseURL: "https://my-burger-app-424d1.firebaseio.com/",
});

export default instance;
