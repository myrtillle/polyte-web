import { useState } from "react";

const SignupForm = ({ onSubmit }) => {
  const [step, setStep] = useState(1);

  // New fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Address fields
  const [barangay, setBarangay] = useState("");
  const [purok, setPurok] = useState("");

  // Old fields (for compatibility)
  const [barangayName, setBarangayName] = useState(""); // will use 'barangay' instead
  const [contactName, setContactName] = useState(""); // will use first/last name instead
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Purok list logic (optional, can be removed if only one purok is needed)
  const [purokInput, setPurokInput] = useState("");
  const [puroks, setPuroks] = useState([]);

  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    const newErrors = {};
    if (!firstName || firstName.length < 2) newErrors.firstName = "First name is required.";
    if (!lastName || lastName.length < 2) newErrors.lastName = "Last name is required.";
    if (!barangay || barangay.length < 2) newErrors.barangay = "Barangay is required.";
    if (!purok || purok.length < 1) newErrors.purok = "Purok is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!username || username.length < 3) newErrors.username = "Username is required.";
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Enter a valid email address.";
    if (!password || password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep2()) return;
    onSubmit({
      firstName,
      lastName,
      barangay,
      purok,
      username,
      email,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
      {step === 1 && (
        <>
          <h2 className="text-lg font-bold text-gray-700 mb-2">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
              {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
              {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <h2 className="text-lg font-bold text-gray-700 mt-6 mb-2">Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Barangay</label>
              <input
                type="text"
                placeholder="Barangay"
                value={barangay}
                onChange={e => setBarangay(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
              {errors.barangay && <p className="text-red-600 text-sm mt-1">{errors.barangay}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Purok</label>
              <input
                type="text"
                placeholder="Purok"
                value={purok}
                onChange={e => setPurok(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
              {errors.purok && <p className="text-red-600 text-sm mt-1">{errors.purok}</p>}
            </div>
          </div>

          <button
            type="button"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold mt-6"
            onClick={handleNext}
          >
            Next: Credentials
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-lg font-bold text-gray-700 mb-2">Credentials</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Username</label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
              {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
              {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
          >
            Sign Up
          </button>

          <button
            type="button"
            className="w-full text-sm text-gray-600 mt-2 hover:underline"
            onClick={() => setStep(1)}
          >
            ← Back
          </button>
        </>
      )}
    </form>
  );
};

export default SignupForm;
