// src/components/KycVerification.jsx
import React, { useState, useRef } from "react";
import { auth, db } from "../../firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function KycVerification() {
  const navigate = useNavigate();
  const [idFile, setIdFile] = useState(null);
  const [selfieFile, setSelfieFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const idInputRef = useRef(null);
  const selfieInputRef = useRef(null);

  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    setSuccess("");
    setError("");

    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError("Only JPEG and PNG image files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB.");
      return;
    }

    setter(file);
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "KYCverification");
    formData.append("cloud_name", "drvgkgzcg");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/drvgkgzcg/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw new Error("Failed to upload file to Cloudinary");
    }
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    const user = auth.currentUser;
    if (!user) {
      setError("You must be logged in to submit KYC.");
      return;
    }
    if (!idFile || !selfieFile) {
      setError("Please upload both your government ID and a selfie.");
      return;
    }

    setLoading(true);

    try {
      const [idUrl, selfieUrl] = await Promise.all([
        uploadToCloudinary(idFile),
        uploadToCloudinary(selfieFile),
      ]);

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        kycDocuments: {
          governmentId: idUrl,
          selfie: selfieUrl,
        },
        kycStatus: "pending", // Keep as pending in Firestore
        kycSubmittedAt: serverTimestamp(),
      });

      // Temporary solution to unlock features immediately
      localStorage.setItem("tempKycVerified", "true");

      setSuccess(
        "✅ KYC documents submitted successfully! All features are now unlocked!"
      );
      setIdFile(null);
      setSelfieFile(null);

      setTimeout(() => navigate("/Dashboard"), 2000);
    } catch (uploadError) {
      setError("❌ Failed to upload documents: " + uploadError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          Submit KYC Documents
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Verify your identity to access all features
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
          <p className="text-red-700 dark:text-red-400 text-center">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-3 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
          <p className="text-green-700 dark:text-green-400 text-center">
            {success}
          </p>
        </div>
      )}

      <div className="space-y-6">
        {/* Government ID Card */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-slate-700 dark:text-slate-300">
              Government-issued ID
            </h3>
            <span className="text-xs px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
              Required
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => idInputRef.current.click()}
              className="flex-1 bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              Choose File
            </button>

            <div className="flex-1 text-left">
              <p className="text-sm text-slate-600 dark:text-slate-400 truncate max-w-[140px]">
                {idFile ? idFile.name : "No file chosen"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                JPEG, PNG (max 5MB)
              </p>
            </div>
          </div>

          <input
            type="file"
            ref={idInputRef}
            accept="image/jpeg,image/png"
            onChange={(e) => handleFileChange(e, setIdFile)}
            disabled={loading}
            className="hidden"
          />

          {idFile && (
            <div className="mt-4 flex justify-center">
              <img
                src={URL.createObjectURL(idFile)}
                alt="Preview ID"
                className="w-32 h-32 object-cover rounded-lg border-2 border-slate-300 dark:border-slate-700"
              />
            </div>
          )}
        </div>

        {/* Selfie with ID */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-slate-700 dark:text-slate-300">
              Selfie with ID
            </h3>
            <span className="text-xs px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
              Required
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => selfieInputRef.current.click()}
              className="flex-1 bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              Choose File
            </button>

            <div className="flex-1 text-left">
              <p className="text-sm text-slate-600 dark:text-slate-400 truncate max-w-[140px]">
                {selfieFile ? selfieFile.name : "No file chosen"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                JPEG, PNG (max 5MB)
              </p>
            </div>
          </div>

          <input
            type="file"
            ref={selfieInputRef}
            accept="image/jpeg,image/png"
            onChange={(e) => handleFileChange(e, setSelfieFile)}
            disabled={loading}
            className="hidden"
          />

          {selfieFile && (
            <div className="mt-4 flex justify-center">
              <img
                src={URL.createObjectURL(selfieFile)}
                alt="Preview Selfie"
                className="w-32 h-32 object-cover rounded-lg border-2 border-slate-300 dark:border-slate-700"
              />
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 focus:ring-offset-white dark:focus:ring-offset-slate-900 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </div>
          ) : (
            "Submit KYC"
          )}
        </button>
      </div>
    </div>
  );
}
