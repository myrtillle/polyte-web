import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Enter a valid email.";
    if (!password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!validate()) return;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setSubmitError("Invalid email or password.");
    } else {
      navigate("/analytics");
    }
  };

  return (
    <div className="min-h-screen bg-mainGreen flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm text-center">
        {/* Logo Placeholder */}
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
            LOGO
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          {submitError && <p className="text-red-600 text-sm mt-1">{submitError}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
          >
            Log In
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-600 space-y-1 text-center">
          <p>
            <a href="#" className="hover:underline">Forgot Password?</a>
          </p>
          <p>
            Don’t have an account?{" "}
            <a href="/signup" className="text-green-700 font-semibold hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
