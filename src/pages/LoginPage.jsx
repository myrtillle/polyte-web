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

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setSubmitError("Invalid email or password.");
    } else if (!data.user?.email_confirmed_at) {
      setSubmitError("Please confirm your email address before logging in. Check your inbox for the confirmation link.");
      await supabase.auth.signOut();
    } else {
      navigate("/overview");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-green-300 px-4">
      <div className="bg-white rounded-xl shadow-md p-10 w-full max-w-md border border-gray-300 text-center">

        {/* Actual Logo */}
        <img src="/polyte-logo.png" alt="POLY.TE Logo" className="h-10 mx-auto mb-2" />
        <p className="text-xs text-gray-600 mb-10">SHORT DESCRIPTION I CAN CHANGE LATER</p>

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <input
              type="email"
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-green-100 placeholder-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-green-100 placeholder-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          {submitError && <p className="text-red-600 text-sm">{submitError}</p>}

          <button
            type="submit"
            className="w-full bg-green-800 hover:bg-gray-900 text-white py-2 rounded-lg text-lg font-bold"
          >
            LOGIN
          </button>
        </form>

        <div className="mt-4 text-xs text-gray-600 text-center space-y-2">
          <p>
            <a href="#" className="hover:underline text-green-800">FORGOT PASSWORD?</a>
          </p>
          <p>
            DON'T HAVE AN ACCOUNT?{" "}
            <a href="/signup" className="font-semibold text-green-800 hover:underline">SIGN UP</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
