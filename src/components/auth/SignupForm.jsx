import { useState } from "react";

const SignupForm = ({ onSubmit }) => {
  const [step, setStep] = useState(1);

  const [barangayName, setBarangayName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [purokInput, setPurokInput] = useState('');
  const [puroks, setPuroks] = useState([]);

  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    const newErrors = {};

    if (!barangayName || barangayName.length < 3) {
      newErrors.barangayName = "Barangay name must be at least 3 characters.";
    }

    if (!contactName || contactName.length < 3) {
      newErrors.contactName = "Contact name must be at least 3 characters.";
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddPurok = () => {
    const trimmed = purokInput.trim();
    if (trimmed && !puroks.includes(trimmed)) {
      setPuroks([...puroks, trimmed]);
      setPurokInput('');
    }
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (puroks.length === 0) {
      setErrors({ puroks: "Please add at least one purok." });
      return;
    }

    onSubmit({
      email,
      password,
      barangayName,
      contactName,
      purokList: puroks,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {step === 1 && (
        <>
          <div>
            <input
              type="text"
              placeholder="Barangay Name"
              value={barangayName}
              onChange={(e) => setBarangayName(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
            {errors.barangayName && <p className="text-red-600 text-sm mt-1">{errors.barangayName}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Contact Person"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
            {errors.contactName && <p className="text-red-600 text-sm mt-1">{errors.contactName}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
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
              required
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="button"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
            onClick={handleNext}
          >
            Next: Add Puroks
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <label className="block text-gray-700 font-semibold">List of Puroks</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Purok Name"
              value={purokInput}
              onChange={(e) => setPurokInput(e.target.value)}
              className="flex-1 px-4 py-2 border rounded"
            />
            <button
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              onClick={handleAddPurok}
            >
              Add
            </button>
          </div>

          {puroks.length > 0 && (
            <ul className="mt-4 list-disc list-inside text-gray-800 space-y-1">
              {puroks.map((purok, index) => (
                <li key={index}>{purok}</li>
              ))}
            </ul>
          )}

          {errors.puroks && <p className="text-red-600 text-sm mt-2">{errors.puroks}</p>}

          <button
            type="submit"
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
            disabled={puroks.length === 0}
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
