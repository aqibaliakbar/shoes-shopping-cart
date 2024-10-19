import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.auth.users);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      dispatch(login({ email: user.email, name: user.name }));
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
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
          <h1 className="text-3xl font-bold mb-8">Welcome</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
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
            <div className="text-right">
              <Link to="/forgot-password" className="text-purple-600 text-sm">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-2 rounded"
            >
              Log in
            </button>
          </form>
          <p className="mt-4 text-center">
            Have no account yet?{" "}
            <Link to="/register" className="text-purple-600">
              Registration
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
