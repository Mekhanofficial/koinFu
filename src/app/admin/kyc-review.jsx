// /pages/admin/kyc-review.jsx
import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { auth } from "../../../firebase";

export default function KYCReviewPage() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "kyc_submissions"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSubmissions(data);
    };

    fetchSubmissions();
  }, []);

  const updateKYC = async (uid, status) => {
    const db = getFirestore();
    await updateDoc(doc(db, "kyc_submissions", uid), {
      status,
      reviewedAt: new Date().toISOString(),
    });

    // Optionally update user profile or claim
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, {
      kyc_status: status,
    });

    alert(`User ${uid} ${status}`);
    setSubmissions((prev) =>
      prev.map((s) => (s.id === uid ? { ...s, status } : s))
    );
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6">KYC Submissions</h1>
      {submissions.map((submission) => (
        <div key={submission.id} className="mb-4 border p-4 rounded shadow">
          <p><strong>Name:</strong> {submission.name}</p>
          <p><strong>Email:</strong> {submission.email}</p>
          <p><strong>Status:</strong> {submission.status}</p>
          <a href={submission.documentURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            View Document
          </a>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => updateKYC(submission.id, "verified")}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Approve
            </button>
            <button
              onClick={() => updateKYC(submission.id, "rejected")}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
