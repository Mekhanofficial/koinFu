import { useState } from "react";
import { auth } from "../../firebase";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function UpdatePassword() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleVisibility = () => setShowPasswords(!showPasswords);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      toast.error("No user is currently logged in.");
      setLoading(false);
      return;
    }

    if (!user.emailVerified) {
      await sendEmailVerification(user);
      toast.error("Email not verified. A new verification email has been sent.");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      toast.success("Password successfully updated.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.error("Password update error:", error);
      toast.error(error.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white p-4">
      <form
        onSubmit={handleUpdate}
        className="bg-slate-900 p-8 rounded-lg shadow-md w-full max-w-md space-y-6 border border-slate-700"
      >
        <h2 className="text-2xl font-bold text-center mb-2">
          Update Password
        </h2>

        {/* Password Fields */}
        <PasswordField
          label="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          visible={showPasswords}
          toggleVisibility={toggleVisibility}
        />
        <PasswordField
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          visible={showPasswords}
          toggleVisibility={toggleVisibility}
        />
        <PasswordField
          label="Confirm New Password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          visible={showPasswords}
          toggleVisibility={toggleVisibility}
        />

        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

        <div className="text-sm text-center text-slate-400 mt-4">
          <button
            type="button"
            onClick={() => navigate("/account")}
            className="underline hover:text-teal-400"
          >
            Back to Account
          </button>
        </div>
      </form>
    </div>
  );
}

function PasswordField({ label, value, onChange, visible, toggleVisibility }) {
  return (
    <div className="relative">
      <label className="block text-sm mb-1">{label}</label>
      <input
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="w-full p-2 pr-10 bg-slate-800 rounded border border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
        required
        minLength={6}
      />
      <button
        type="button"
        onClick={toggleVisibility}
        className="absolute top-8 right-3 text-slate-400 hover:text-white"
        tabIndex={-1}
      >
        {visible ? (
          <EyeSlashIcon className="w-5 h-5" />
        ) : (
          <EyeIcon className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
