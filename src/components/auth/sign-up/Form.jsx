import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { toast } from "react-toastify";
import countryData from "./CountryData.json";
import Button from "../../Button";
import Input from "../Input";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    sex: "",
    country: "",
    currencyCode: "",
    currencySymbol: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (formData.country) {
      const selectedCountry = countryData.find(
        (country) => country.name === formData.country
      );
      if (selectedCountry) {
        setFormData((prevData) => ({
          ...prevData,
          currencyCode: selectedCountry.currencyCode,
          currencySymbol: selectedCountry.currencySymbol,
        }));
      }
    }
  }, [formData.country]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        sex: formData.sex,
        country: formData.country,
        currencyCode: formData.currencyCode,
        currencySymbol: formData.currencySymbol,
        createdAt: new Date().toISOString(),
      });

      await updateProfile(userCredential.user, {
        displayName: `${formData.firstName} ${formData.lastName}`,
      });

      await sendEmailVerification(userCredential.user);

      toast.success("Verification email sent! Please check your inbox.");
      setTimeout(() => navigate("/loginpage"), 3000);
    } catch (err) {
      let errorMessage = "Sign up failed. Please try again.";
      switch (err.code) {
        case "auth/email-already-in-use":
          errorMessage = "This email is already registered. Try logging in instead.";
          break;
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address.";
          break;
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters.";
          break;
        default:
          errorMessage = err.message.replace("Firebase: ", "");
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
          <h2 className="text-sm font-bold text-gray-900">
            <Link to="/LoginPage" className="text-blue-500 hover:underline">
              Sign in
            </Link>
            <span className="text-gray-400"> / Sign up</span>
          </h2>
          <h1 className="text-3xl font-extrabold text-amber-600">
            ELITE<span className="text-amber-400">BITX</span>
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
          <Input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
          <Input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          <Input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
          <select name="sex" className="w-full p-3 border rounded-lg bg-gray-100" onChange={handleChange} value={formData.sex} required>
            <option value="">-- Select Sex --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <select name="country" className="w-full p-3 border rounded-lg bg-gray-100" onChange={handleChange} value={formData.country} required>
            <option value="">-- Select Country --</option>
            {countryData.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          <Input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <Input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
          <Button type="fill" className="w-full p-3 text-white bg-orange-500 rounded-lg hover:bg-orange-600" disabled={isLoading} isLoading={isLoading}>
            SIGN UP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
