import { useState } from 'react';
import { authService } from '../../services/authService';

const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);
    const { error } = await authService.resetPassword(password);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setMessage('Password has been reset! You can now log in.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl mb-4 font-bold">Reset Password</h2>
      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
        required
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full" disabled={loading}>
        {loading ? 'Resetting...' : 'Reset Password'}
      </button>
      {message && <div className="text-green-600 mt-2">{message}</div>}
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </form>
  );
};

export default ResetPasswordForm; 