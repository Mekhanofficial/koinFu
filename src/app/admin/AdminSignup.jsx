import { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isSignupLoading, setIsSignupLoading] = useState(false);
const navigate = useNavigate();
const validAuthCode = import.meta.env.VITE_ADMIN_AUTH_CODE;


  const signupAdmin = async () => {
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (authCode !== validAuthCode) {
      toast.error("Invalid authorization code.");
      return;
    }

    setIsSignupLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store admin info in Firestore using correct modular syntax
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        isAdmin: true,
        createdAt: new Date().toISOString(),
      });

      toast.success("Admin signed up successfully!");
      navigate("/AdminLogin");// ✅ Redirect to AdminLogin
    } catch (error) {
      console.error("Signup error:", error.code, error.message);
      toast.error(error.message || "Signup failed. Please try again.");
    } finally {
      setIsSignupLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1c1f2d] px-5 py-10 grid grid-rows-[auto_1fr] gap-10">
      <div className="w-full max-w-sm mx-auto">
        <input
          type="text"
          placeholder="Authorization Code"
          value={authCode}
          onChange={(e) => setAuthCode(e.target.value)}
          className="p-2 mb-4 w-full rounded bg-gray-800 text-white"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 mb-4 w-full rounded bg-gray-800 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 mb-4 w-full rounded bg-gray-800 text-white"
        />

        <button
          onClick={signupAdmin}
          className={`text-white bg-[#f42f54] py-3 px-10 rounded-md w-full mt-6 ${
            isSignupLoading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          disabled={isSignupLoading}
        >
          {isSignupLoading ? "Signing up..." : "Sign up as Admin"}
        </button>
        <p>Aready have an Account?<Link to="/AdminLogin">Login</Link></p>
      </div>
    </div>
  );
};

export default AdminSignup;
