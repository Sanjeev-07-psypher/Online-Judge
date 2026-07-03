//authService acts as a middle layer between React components and backend authentication APIs.
import api from "../api/axios";

export const registerUser = (data) =>{
    return api.post("/auth/register",data);
}

export const loginUser = (data) =>{
    return api.post("/auth/login",data);
}

export const logoutUser = () =>{
    return api.post("/auth/logout");
}

export const getCurrentUser = () =>{
    return api.get("/auth/me");
}