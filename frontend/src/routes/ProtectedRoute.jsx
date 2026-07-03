import { Navigate } from "react-router-dom";
// to navigate/redirect user to another page
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({children}){
    const {user} = useAuth();
    if(!user){
        return <Navigate to="/login" />;
    }

    return children;
}