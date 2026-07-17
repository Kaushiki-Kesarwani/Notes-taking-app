import { createContext , useState , useEffect} from "react";
import api from '../lib/axios'

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

    const[user,setUser] = useState(null);
    const[loading,setLoading] = useState(true);

    const checkAuth = async () =>{
            try{
                const res = await api.get("/auth/me")
                console.log(res);
              setUser(res.data.user);
            }catch(err){
                setUser(null);
            }finally{
                setLoading(false);
            }
    } ;
  
    useEffect(()=>{
        checkAuth()
    },[]);
    return(
        <AuthContext.Provider
             value={{
                user,
                setUser,
                loading,
                setLoading,
                login
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const login = async (email,password)=>{
    try{
       const success = await api.post('/auth/login',{
            email,
            password
        });

        await checkAuth();
    }catch(err){
        throw err;
    }
};