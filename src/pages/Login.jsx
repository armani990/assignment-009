import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { showToast } from "../components/Toast";
import googleIcon from '../assets/logo.png'
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const { login, googleLogin, forgotPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      showToast("success", "Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      showToast("error", err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      navigate(from, { replace: true });
    } catch (err) {
      showToast("error", "Google login failed");
    }
  };

  const handleForgot = async () => {
    if (!email) return showToast("error", "Enter email first");
    try {
      await forgotPassword(email);
      showToast("success", "Password reset email sent!");
    } catch (err) {
      showToast("error", err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-700">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded placeholder-gray-400 pr-12 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 text-sm text-gray-600 hover:text-gray-800"
            >
              {showPass ? "Hide" : "Show"}
            </button>
          </div>
          <p
            className="text-sm text-green-600 cursor-pointer hover:underline"
            onClick={handleForgot}
          >
            Forgot Password?
          </p>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>

        <button
          onClick={handleGoogle}
          className="w-full mt-4 border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
        >
          <img
            src={googleIcon}
            className="w-5 font-black"
            alt="Google"
          />
         <span className="text-gray-800 font-medium">Continue with Google</span>
        </button>

        <p className="text-center mt-4 text-gray-600">
          New? <Link to="/signup" className="text-green-600 hover:underline">Sign-up</Link>
        </p>
      </div>
    </div>
  );
}
