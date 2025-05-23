import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setSubmitError("Invalid email or password.");
    } else {
      navigate("/analytics");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-14 w-full max-w-2xl border border-gray-300 text-center">
        <img src="/polyte-logo.png" alt="POLY.TE Logo" className="h-12 mx-auto mb-2" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Login</h1>
        <p className="text-sm text-gray-600 mb-8">Sign in to your account to continue</p>
        <form onSubmit={handleLogin} className="space-y-6 text-left max-w-md mx-auto">
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 bg-green-100 placeholder-gray-600 border ${errors.email ? 'border-red-400' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-base`}
              autoComplete="email"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 bg-green-100 placeholder-gray-600 border ${errors.password ? 'border-red-400' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-base`}
                autoComplete="current-password"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-green-700 focus:outline-none"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>
          {submitError && <p className="text-red-600 text-sm text-center">{submitError}</p>}
          <button
            type="submit"
            className="w-full bg-green-800 hover:bg-gray-900 text-white py-3 rounded-lg text-lg font-bold transition disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-6 flex flex-col items-center gap-2 text-sm text-gray-600">
          <button
            type="button"
            className="hover:underline text-green-800 font-semibold focus:outline-none"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot Password?
          </button>
          <span>
            Don&apos;t have an account?{' '}
            <a href="/signup" className="font-semibold text-green-800 hover:underline">Sign Up</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
