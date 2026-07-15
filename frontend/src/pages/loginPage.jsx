import React from 'react'
import{useState} from 'react'
import{Link,useNavigate} from 'react-router'
import api from '../lib/axios'
import toast from 'react-hot-toast'

const navigate = useNavigate();

const LoginPage = () => {

const[email,setEmail] = useState("");
const[password,setPassword] = useState("");
const[loading,setLoading] = useState(false);

const handleLogin = async (e) =>{
    e.preventDefault();

    if(!email || !password){
        toast.error("All fields are required.");
    }
        setLoading(true);
try{
await api.post('/auth/login',{
        email,
        password,
    });
    toast.success("Login successful.")
    navigate("/");
}catch(err){
    if(err.response?.status === 409){
        toast
    }

}finally{

}
    
}

  return (
    <div>login Page</div>
  )
}

export default LoginPage