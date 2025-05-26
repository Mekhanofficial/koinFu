import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError("");
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
    
      if (!user.emailVerified) {
        await auth.signOut(); // prevent access
        toast.error("Please verify your email before logging in.");
        return;
      }
      toast.success("Welcome Home!");
      // Email is verified, allow access
      navigate("/dashboard");
      
    } catch (err) {
      switch (err.code) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
          toast.error( "Invalid email or password");
          break;
        case 'auth/user-not-found':
          toast.error("No account found with this email");
          break;
        case 'auth/too-many-requests':
          toast.error("Account temporarily locked. Try again later");
          break;
        case 'auth/user-disabled':
          toast.error("This account has been disabled");
          break;
          case 'auth/network-request-failed':
  toast.error("Network error. Please check your internet connection.");
  break;
  case 'auth/invalid-email':
  toast.error("Please enter a valid email address.");
  break;
        default:
          toast.error("Something went wrong");

      }

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-teal-950">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-500 rounded-2xl shadow-lg">
        <div className="text-center">
          <h2 className=" font-bold text-gray-900">
            Sign in{" "}
            <span className="text-gray-400">
              <Link to="/SignUpPage" className="text-blue-300 hover:underline">
                Sign up
              </Link>
            </span>
          </h2>
          <h1 className="text-3xl font-extrabold text-teal-600">
            KOIN<span className="text-teal-400">FU</span>
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              className="w-full p-3 mt-1 border rounded-lg bg-gray-100 text-gray-900 focus:ring focus:ring-orange-300"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full p-3 mt-1 border rounded-lg bg-gray-100 text-gray-900 focus:ring focus:ring-orange-300 pr-10"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-3 text-white rounded-lg flex justify-center items-center ${
              isLoading ? 'bg-teal-400' : 'bg-teal-500 hover:bg-teal-600'
            }`}
          >
            {isLoading ? (
              <>
                <svg 
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                PROCESSING...
              </>
            ) : (
              "LOG IN"
            )}
          </button>
        </form>
        
        <p className="text-sm text-center text-gray-600">
          <Link to="/ForgotPassword" className="text-gray-400 hover:underline">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;