import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import SignupForm from "../components/auth/SignupForm";

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    try {
      await authService.signupBarangay(formData);
      alert("Signup complete!");
      navigate("/analytics");
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-green-300 px-4">
      <div className="bg-white rounded-xl shadow-md p-10 w-full max-w-xl border border-gray-300 text-center">
        {/* Logo */}
        <img src="/polyte-logo.png" alt="POLY.TE Logo" className="h-10 mx-auto mb-2" />
        <p className="text-xs text-gray-600 mb-6">SHORT DESCRIPTION I CAN CHANGE LATER</p>

        {/* Form */}
        <SignupForm onSubmit={handleSignup} />

        {/* Navigation link */}
        <div className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-green-700 font-semibold hover:underline">Log In</a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
