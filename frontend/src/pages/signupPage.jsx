import React from 'react'
import{useState} from 'react'
import{Link,useNavigate} from 'react-router'
import toast from 'react-hot-toast'
import api from '../lib/axios'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const SignupPage = () => {
  const{signup} = useContext(AuthContext);
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[loading,setLoading] = useState(false);

    const navigate = useNavigate();


    const handleSubmit= async (e)=>{
        e.preventDefault();

        if(!name.trim() || !email.trim() || !password.trim()){
            toast.error("All fields are required.");
            return;
        }

        setLoading(true);

        try{
            await signup(name,email,password);

            toast.success("Account created successfully.");
            navigate("/login");

        }catch(err){
            if(err.response?.status === 409){
                toast.error("Email already exists.");
            }else{
                toast.error("signup failed.");
            }

        }finally{
                setLoading(false);
        }
    }

  return (
   <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-base-100 border border-base-300 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
          <div className="card-body p-8">

            <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
              ThinkBoard
            </h1>

            <h2 className="text-2xl font-semibold text-center mt-3">
              Create your account
            </h2>

            <p className="text-center text-base-content/70 mb-6">
              Join ThinkBoard and start writing your notes.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Name
                  </span>
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Email
                  </span>
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Password
                  </span>
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="btn btn-primary w-full mt-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

            </form>

            <p className="text-center mt-6 text-base-content/70">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-semibold hover:underline"
              >
                Login
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage