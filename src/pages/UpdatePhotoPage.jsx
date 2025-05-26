import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const defaultAvatars = [
  "https://cdn.pixabay.com/photo/2018/01/18/07/31/bitcoin-3089728_640.jpg",
  "https://cdn.pixabay.com/photo/2022/05/10/15/08/bitcoin-7187347_640.png",
  "https://cdn.pixabay.com/photo/2017/08/14/14/38/bitcoin-2640692_640.png",
  "https://cdn.pixabay.com/photo/2021/05/24/09/15/ethereum-logo-6278329_640.png",
];

export default function UpdatePhotoPage() {
  const [user, setUser] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [customImageFile, setCustomImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        if (currentUser.photoURL) {
          setPreviewUrl(currentUser.photoURL);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.match("image.*")) {
      setMessage("Please select an image file (JPEG, PNG, etc.)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image size should be less than 5MB");
      return;
    }

    setSelectedAvatar("");
    setCustomImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setMessage("");
  };

  const handleAvatarSelect = (avatarUrl) => {
    setCustomImageFile(null);
    setPreviewUrl(avatarUrl);
    setSelectedAvatar(avatarUrl);
    setMessage("");
  };

  const handleSave = async () => {
    if (!user) {
      setMessage("No user logged in");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      let photoURL = user.photoURL || "";

      if (customImageFile) {
        console.log("Starting upload..."); // Debug log
        const fileExt = customImageFile.name.split(".").pop();
        const fileRef = ref(
          storage,
          `user_avatars/${user.uid}/${Date.now()}.${fileExt}`
        );

        // Add upload progress monitoring
        const uploadTask = uploadBytes(fileRef, customImageFile);
        uploadTask.then((snapshot) => {
          console.log("Upload completed:", snapshot); // Debug log
        });

        await uploadTask;
        console.log("Getting download URL..."); // Debug log
        photoURL = await getDownloadURL(fileRef);
        console.log("Download URL:", photoURL); // Debug log
      } else if (selectedAvatar) {
        photoURL = selectedAvatar;
      } else {
        setMessage("Please select or upload an image");
        setLoading(false);
        return;
      }

      console.log("Updating profile..."); // Debug log
      await updateProfile(user, { photoURL });
      console.log("Profile updated successfully"); // Debug log

      setMessage("Profile photo updated successfully!");
      setTimeout(() => navigate("/account"), 1500);
    } catch (error) {
      console.error("Full error:", error); // More detailed error log
      setMessage(`Error: ${error.message}`);

      // Check for specific storage errors
      if (error.code) {
        console.error("Firebase error code:", error.code);
        setMessage(`Error (${error.code}): ${error.message}`);
      }
    } finally {
      setLoading(false);
      console.log("Finished save operation"); // Debug log
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Update Profile Photo</h1>

      {/* Preview */}
      <div className="mb-6">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-32 h-32 rounded-full border-4 border-teal-500 shadow-lg mb-4 object-cover"
          />
        ) : (
          <div className="w-32 h-32 rounded-full border-4 border-slate-700 bg-slate-800 flex items-center justify-center">
            <span className="text-slate-500">No image selected</span>
          </div>
        )}
      </div>

      {/* Avatar Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {defaultAvatars.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Avatar ${idx + 1}`}
            onClick={() => handleAvatarSelect(src)}
            className={`w-20 h-20 rounded-full cursor-pointer border-4 ${
              selectedAvatar === src ? "border-teal-500" : "border-slate-700"
            } hover:scale-105 transition object-cover`}
          />
        ))}
      </div>

      {/* Upload Button */}
      <label className="mb-6 block w-full max-w-xs">
        <span className="block text-sm mb-2">Or upload a custom image</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700"
          disabled={loading}
        />
      </label>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={loading || (!customImageFile && !selectedAvatar)}
        className="bg-teal-600 hover:bg-teal-700 px-6 py-2 rounded-lg text-white disabled:opacity-50 mb-3 transition-colors"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
            Saving...
          </span>
        ) : (
          "Save Photo"
        )}
      </button>

      {/* Message */}
      {message && (
        <p
          className={`text-sm mt-2 text-center ${
            message.includes("Error") ? "text-red-400" : "text-teal-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
