import React, { useState } from "react";
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
        isKycVerified: false,
        kycStatus: "pending",
        kycSubmittedAt: serverTimestamp(),
      });

      setSuccess("✅ KYC documents submitted successfully! Verification is pending.");
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
    <div className="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-slate-900 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        Submit KYC Documents
      </h2>

      {error && (
        <div className="mb-4 text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900 p-2 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900 p-2 rounded">
          {success}
        </div>
      )}

      <div className="mb-4 text-left">
        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
          Government-issued ID (JPEG, PNG, max 5MB):
        </label>
        <input
          type="file"
          accept="image/jpeg,image/png"
          onChange={(e) => handleFileChange(e, setIdFile)}
          disabled={loading}
          className="w-full"
        />
        {idFile && (
          <img
            src={URL.createObjectURL(idFile)}
            alt="Preview ID"
            className="w-24 h-24 object-cover mx-auto mt-2 rounded-md border"
          />
        )}
      </div>

      <div className="mb-4 text-left">
        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
          Selfie with ID (JPEG, PNG, max 5MB):
        </label>
        <input
          type="file"
          accept="image/jpeg,image/png"
          onChange={(e) => handleFileChange(e, setSelfieFile)}
          disabled={loading}
          className="w-full"
        />
        {selfieFile && (
          <img
            src={URL.createObjectURL(selfieFile)}
            alt="Preview Selfie"
            className="w-24 h-24 object-cover mx-auto mt-2 rounded-md border"
          />
        )}
      </div>

      {loading && (
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Uploading...
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-md transition"
      >
        {loading ? "Submitting..." : "Submit KYC"}
      </button>
    </div>
  );
}
