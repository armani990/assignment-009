import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { showToast } from "../components/Toast";
import googleIcon from "../assets/logo.png";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const { signup, updateUserProfile, googleLogin } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (pass) => {
    if (pass.length < 6) return "Password must be 6+ characters";
    if (!/[A-Z]/.test(pass)) return "Must have uppercase";
    if (!/[a-z]/.test(pass)) return "Must have lowercase";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passError = validatePassword(password);
    if (passError) return setError(passError);

    try {
      await signup(email, password);
      await updateUserProfile({ displayName: name, photoURL: photo });
      showToast("success", "Account created!");
      navigate("/");
    } catch (err) {
      showToast("error", err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      showToast("success", "Signed in with Google!");
      navigate("/");
    } catch (err) {
      showToast("error", "Google login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-700">Sign-Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="url"
            value={photo}
            onChange={e => setPhoto(e.target.value)}
            placeholder="Photo URL"
            className="w-full p-3 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded pr-12 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>

        <button
          onClick={handleGoogle}
          className="w-full mt-4 bg-white border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
        >
          <img src={googleIcon} className="w-5 h-5" alt="Google" />
          <span className="text-gray-800 font-medium">Continue with Google</span>
        </button>

        <p className="text-center mt-4 text-gray-600">
          Have an account? <Link to="/login" className="text-green-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
