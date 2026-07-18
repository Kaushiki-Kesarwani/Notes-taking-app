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
    const login = async (email,password)=>{
    try{
        await api.post('/auth/login',{
            email,
            password
        });

        await checkAuth();
    }catch(err){
        throw err;
    }
};
const logout = async ()=>{
    try{
        await api.post('/auth/logout');
    setUser(null);
    }catch(err){
        throw err;
    }

    
}
  
    useEffect(()=>{
        checkAuth()
    },[]);
    return(
        <AuthContext.Provider
             value={{
                user,
                loading,
                login,
                 logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

