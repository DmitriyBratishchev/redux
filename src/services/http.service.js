import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";

const httpSevice = {
  get: axios.get,
  post: axios.post
}

export default httpSevice;