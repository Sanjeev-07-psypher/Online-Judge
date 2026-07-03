import { Children, createContext, useContext, useState } from "react";
// createContext is a React COntext object, like a global storage container

const AuthContext=createContext();

export const AuthProvider = ({children})=>{
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(false);

    const value = {user,setUser,loading,setLoading,};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
        // provider makes the data available to components below it otherwise nothing useful will be passed
        //children=whatever is wrapped inside authProvider
    );
};

export const useAuth = () =>{
    return useContext(AuthContext);
}