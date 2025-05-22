import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('If this email is registered, a password reset link has been sent.');
    } catch (err) {
      toast.error('Something went wrong. Please try again later.');
      
    }

    setLoading(false);
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 rounded-xl shadow-lg border bg-white">
      <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded mb-4"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Sending...' : 'Send Password Reset'}
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default ForgotPassword;
