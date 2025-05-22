import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import {
  updateProfile
} from "firebase/auth";
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";
import { useNavigate } from "react-router-dom";

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
    const currentUser = auth.currentUser;
    if (currentUser) setUser(currentUser);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedAvatar(""); // deselect avatar
    setCustomImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleAvatarSelect = (avatarUrl) => {
    setCustomImageFile(null);
    setPreviewUrl(avatarUrl);
    setSelectedAvatar(avatarUrl);
  };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    setMessage("");

    try {
      let photoURL = "";

      if (customImageFile) {
        const fileRef = ref(storage, `user_avatars/${user.uid}/${customImageFile.name}`);
        await uploadBytes(fileRef, customImageFile);
        photoURL = await getDownloadURL(fileRef);
      } else if (selectedAvatar) {
        photoURL = selectedAvatar;
      } else {
        setMessage("Please select or upload an image.");
        setLoading(false);
        return;
      }

      await updateProfile(user, { photoURL });
      setMessage("Profile photo updated successfully!");
      setTimeout(() => navigate("/account"), 1500);
    } catch (err) {
      console.error(err);
      setMessage("Failed to update photo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Update Profile Photo</h1>

      {/* Preview */}
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-32 h-32 rounded-full border-4 border-teal-500 shadow-lg mb-4"
        />
      )}

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
            } hover:scale-105 transition`}
          />
        ))}
      </div>

      {/* Upload Button */}
      <label className="mb-6 block">
        <span className="block text-sm mb-2">Or upload a custom image</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700"
        />
      </label>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-teal-600 hover:bg-teal-700 px-6 py-2 rounded-lg text-white disabled:opacity-50 mb-3"
      >
        {loading ? "Saving..." : "Save Photo"}
      </button>

      {/* Message */}
      {message && (
        <p className="text-sm mt-2 text-center text-teal-400">{message}</p>
      )}
    </div>
  );
}
