import axios from "axios";

const api=axios.create({
    baseURL:"http://localhost:5000/api",
    withCredentials:true,
});
// axios.create = creates a pre-configured axios object.
//withCredentials: true tells axios: Include cookies with requests.

export default api;