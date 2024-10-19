import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../features/auth/authSlice";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !rePassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== rePassword) {
      setError("Passwords don't match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      setError("Password must contain both letters and numbers");
      return;
    }
    dispatch(register({ name, email, password }));
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/2 bg-purple-600 flex flex-col justify-center items-center text-white">
        <img
          src="/api/placeholder/300/300"
          alt="Shop illustration"
          className="mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">Welcome to our shop</h2>
        <p>Purchase imported shoes</p>
        <div className="flex mt-4">
          <div className="w-2 h-2 bg-white rounded-full mx-1"></div>
          <div className="w-2 h-2 bg-white bg-opacity-50 rounded-full mx-1"></div>
          <div className="w-2 h-2 bg-white bg-opacity-50 rounded-full mx-1"></div>
        </div>
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="w-2/3">
          <h1 className="text-3xl font-bold mb-8">Registration</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}
            <div className="relative">
              <User size={20} className="absolute left-2 top-2 text-gray-500" />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 pl-10 border rounded"
                required
              />
            </div>
            <div className="relative">
              <Mail size={20} className="absolute left-2 top-2 text-gray-500" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 pl-10 border rounded"
                required
              />
            </div>
            <div className="relative">
              <Lock size={20} className="absolute left-2 top-2 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 pl-10 border rounded"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="relative">
              <Lock size={20} className="absolute left-2 top-2 text-gray-500" />
              <input
                type={showRePassword ? "text" : "password"}
                placeholder="Re-enter password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                className="w-full p-2 pl-10 border rounded"
                required
              />
              <button
                type="button"
                onClick={() => setShowRePassword(!showRePassword)}
                className="absolute right-2 top-2 text-gray-500"
              >
                {showRePassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-2 rounded"
            >
              Create Account
            </button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/" className="text-purple-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
