import { useState, useContext } from "react";
import toast from "react-hot-toast";
import { ArrowLeftIcon } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router";

import React from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim || !password.trim) {
      toast.error("All fields are required");
    }

    setLoading(true);

    try {
      await login(email, password);
      toast.success("login successful");
      navigate("/");
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Link to="/signup" className="btn btn-ghost gap-2 mb-8">
            <ArrowLeftIcon className="size-5" />
            Back
          </Link>

          <div className="bg-base-100 border border-base-300 rounded-3xl p-8 shadow-xl">
            <h1 className="text-4xl font-bold text-primary mb-2">
              Welcome Back
            </h1>

            <p className="text-base-content/70 mb-8">
              Login to continue using ThinkBoard.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Logging In...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <p className="text-center mt-6">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
