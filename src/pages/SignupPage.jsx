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
    <div className="min-h-screen bg-mainGreen flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg text-center">
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
            LOGO
          </div>
        </div>

        <SignupForm onSubmit={handleSignup} />

        <div className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-green-700 font-semibold hover:underline">Log In</a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
