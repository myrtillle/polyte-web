import { useState } from 'react';
import { authService } from '../../services/authService';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);
    const { error } = await authService.forgotPassword(email);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setMessage('Password reset email sent! Please check your inbox.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl mb-4 font-bold">Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
        required
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full" disabled={loading}>
        {loading ? 'Sending...' : 'Send Reset Link'}
      </button>
      {message && <div className="text-green-600 mt-2">{message}</div>}
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </form>
  );
};

export default ForgotPasswordForm; 