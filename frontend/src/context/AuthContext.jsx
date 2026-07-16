import { createContext , useState , useEffect} from "react";
import api from '../lib/axios'

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

    const[user,setUser] = useState(null);
    const[loading,setLoading] = useState(true);

    const checkAuth = async () =>{
            try{
                const res = await api.get("/auth/me")
            }catch(err){

            }
    } ;
    return(
        <AuthContext.Provider
             value={{
                user,
                setUser,
                loading,
                setLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};