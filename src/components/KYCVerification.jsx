import { useState } from "react";
import {
  auth,
  storage,
  db,
  ref,
  uploadBytes,
  getDownloadURL,
  doc,
  updateDoc
} from "../../firebase";

export default function KYCVerification() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a file.");
      return;
    }

    setUploading(true);
    try {
      const uid = auth.currentUser.uid;
      const storageRef = ref(storage, `kyc_documents/${uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      const userDocRef = doc(db, "users", uid);
      await updateDoc(userDocRef, {
        kycStatus: "pending",
        kycDocURL: downloadURL,
      });

      setStatus("KYC document uploaded successfully. Awaiting approval.");
      setFile(null);
    } catch (err) {
      console.error(err);
      setStatus("Upload failed. Please try again.");
    }
    setUploading(false);
  };

  return (
    <div className="border p-4 rounded-lg shadow-lg bg-white dark:bg-gray-900">
      <h2 className="text-lg font-semibold mb-4">KYC Verification</h2>
      <input type="file" accept=".png,.jpg,.jpeg,.pdf" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="mt-4 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
      >
        {uploading ? "Uploading..." : "Submit KYC"}
      </button>
      {status && <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{status}</p>}
    </div>
  );
}
