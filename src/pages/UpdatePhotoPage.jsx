import { useState, useEffect } from "react";
import { FaUser, FaCheck, FaUpload, FaArrowLeft, FaSpinner } from "react-icons/fa";
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
  "https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083379_640.jpg",
  "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_640.jpg",
];

export default function updateProfilePage() {
  const [user, setUser] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [customImageFile, setCustomImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
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
        const fileExt = customImageFile.name.split(".").pop();
        const fileRef = ref(
          storage,
          `user_avatars/${user.uid}/${Date.now()}.${fileExt}`
        );
        
        await uploadBytes(fileRef, customImageFile);
        photoURL = await getDownloadURL(fileRef);
      } else if (selectedAvatar) {
        photoURL = selectedAvatar;
      } else {
        setMessage("Please select or upload an image");
        setLoading(false);
        return;
      }

      await updateProfile(user, { photoURL });
      
      setMessage("Profile photo updated successfully!");
      setIsSuccess(true);
      
      setTimeout(() => {
        navigate("/account");
      }, 2000);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-10 bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-700 p-6 relative">
          <button 
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
          >
            <FaArrowLeft className="text-white text-lg" />
          </button>
          <div className="flex justify-center">
            <div className="bg-white/20 p-4 rounded-full">
              <FaUser className="text-white text-2xl" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white text-center mt-4">
            {isSuccess ? "Photo Updated!" : "Update Profile Photo"}
          </h1>
        </div>
        
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheck className="text-green-400 text-3xl" />
              </div>
              <p className="text-lg font-medium text-white">
                Your profile photo has been updated successfully!
              </p>
              <p className="text-slate-400 mt-2">
                You'll be redirected back to your account shortly.
              </p>
            </div>
          ) : (
            <>
              {/* Preview */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-40 h-40 rounded-full border-4 border-teal-500 shadow-xl object-cover"
                    />
                  ) : (
                    <div className="w-40 h-40 rounded-full border-4 border-slate-700 bg-slate-700 flex items-center justify-center">
                      <FaUser className="text-slate-500 text-5xl" />
                    </div>
                  )}
                </div>
              </div>

              {/* Avatar Grid */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4 text-center text-slate-300">
                  Choose a default avatar
                </h2>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {defaultAvatars.map((src, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleAvatarSelect(src)}
                      className={`relative rounded-full cursor-pointer transition-all transform hover:scale-105 ${
                        selectedAvatar === src ? "ring-4 ring-teal-500" : ""
                      }`}
                    >
                      <img
                        src={src}
                        alt={`Avatar ${idx + 1}`}
                        className="w-full h-full rounded-full object-cover aspect-square"
                      />
                      {selectedAvatar === src && (
                        <div className="absolute inset-0 bg-teal-500/30 rounded-full flex items-center justify-center">
                          <FaCheck className="text-white text-xl" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Upload Section */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4 text-center text-slate-300">
                  Or upload your own
                </h2>
                <div className="flex justify-center">
                  <label className="flex flex-col items-center justify-center w-full max-w-xs cursor-pointer">
                    <div className="bg-slate-700/50 hover:bg-slate-700 border-2 border-dashed border-slate-600 rounded-xl p-6 text-center transition-colors w-full">
                      <div className="flex flex-col items-center">
                        <div className="bg-teal-600/20 p-3 rounded-full mb-3">
                          <FaUpload className="text-teal-400 text-xl" />
                        </div>
                        <p className="font-medium">Upload an image</p>
                        <p className="text-sm text-slate-400 mt-1">
                          JPG, PNG (max 5MB)
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      disabled={loading}
                    />
                  </label>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleSave}
                  disabled={loading || (!customImageFile && !selectedAvatar)}
                  className={`px-8 py-3 rounded-lg font-medium text-white shadow-lg transition-all ${
                    loading 
                      ? "bg-teal-500 cursor-not-allowed" 
                      : "bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 hover:shadow-xl transform hover:-translate-y-0.5"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <FaSpinner className="animate-spin mr-2" />
                      Saving...
                    </div>
                  ) : "Save Profile Photo"}
                </button>
              </div>

              {/* Message */}
              {message && (
                <p
                  className={`text-center mt-4 p-3 rounded-lg ${
                    message.includes("Error") 
                      ? "bg-red-900/30 text-red-400" 
                      : "bg-teal-900/30 text-teal-400"
                  }`}
                >
                  {message}
                </p>
              )}
            </>
          )}
        </div>
      </div>
      
      <div className="mt-8 text-center text-slate-500 text-sm">
        <p>Your profile photo is visible to other users</p>
      </div>
    </div>
  );
}