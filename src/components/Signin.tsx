"use client";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X } from "lucide-react";

export default function AuthForm() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [alert, setAlert] = useState<{ type: 'error' | 'success', message: string } | null>(null);

  // Password validation helper
  const validatePassword = (password: string) => {
    const requirements = [
      { regex: /.{8,}/, message: "at least 8 characters" },
      { regex: /[A-Z]/, message: "one uppercase letter" },
      { regex: /[a-z]/, message: "one lowercase letter" },
      { regex: /[0-9]/, message: "one number" },
      { regex: /[@$!%*?&]/, message: "one special character (@$!%*?&)" }
    ];

    const failedRequirements = requirements.filter(
      req => !req.regex.test(password)
    );

    if (failedRequirements.length === 0) {
      return { isValid: true, message: "" };
    }

    return {
      isValid: false,
      message: "Password must contain " + 
        failedRequirements.map(r => r.message).join(", ")
    };
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Name validation
    if (isSignUp && name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (isSignUp) {
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.message;
      }
    }

    // Confirm password validation
    if (isSignUp && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "" };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;

    const labels = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"];
    return { 
      strength: strength,
      label: labels[strength - 1] || ""
    };
  };

  const showAlert = (type: 'error' | 'success', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (isSignUp) {
        const res = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (res.ok) {
          showAlert('success', "Signup successful! Please sign in.");
          setIsSignUp(false);
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        } else {
          showAlert('error', data.error || "Signup failed. Please try again.");
        }
      } else {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          showAlert('error', "Invalid email or password");
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      showAlert('error', "An unexpected error occurred. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen   bg-gray-100">
      <div className="w-96 bg-white p-6 rounded-lg shadow-lg relative">
        {/* Alert Component */}
        {alert && (
          <div className={`absolute top-0 left-0 right-0 -mt-16  w-full max-w-sm`}>
            <Alert className={`${alert.type === 'error' ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'}`}>
              <AlertDescription className="flex justify-between items-center">
                <span>{alert.message}</span>
                <button onClick={() => setAlert(null)} className="ml-2">
                  <X size={16} />
                </button>
              </AlertDescription>
            </Alert>
          </div>
        )}

        <div className="flex justify-center mb-4">
          <img src="/runvay(logo).jpg" alt="Logo" className="h-12 w-auto" />
        </div>

        <div className="flex border-b-2 border-gray-200 pb-2 mb-4 relative">
          <div
            className="absolute bottom-0 h-0.5 bg-black transition-all duration-300 ease-in-out"
            style={{
              width: '50%',
              transform: `translateX(${isSignUp ? '100%' : '0%'})`
            }}
          />
          <button
            onClick={() => {
              setIsSignUp(false);
              setErrors({});
              setAlert(null);
            }}
            className={`w-1/2 transition-colors duration-300 text-lg ${
              !isSignUp ? "font-semibold text-black" : "text-gray-400"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setIsSignUp(true);
              setErrors({});
              setAlert(null);
            }}
            className={`w-1/2 transition-colors duration-300 text-lg ${
              isSignUp ? "font-semibold text-black" : "text-gray-400"
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block">
                <span className="text-gray-700 text-sm font-medium mb-1 block">Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) {
                      const newErrors = { ...errors };
                      delete newErrors.name;
                      setErrors(newErrors);
                    }
                  }}
                  className={`w-full p-2.5 border-2 ${
                    errors.name ? 'border-red-500' : 'border-gray-200'
                  } rounded-md focus:border-black focus:outline-none transition-colors duration-200`}
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </label>
            </div>
          )}

          <div>
            <label className="block">
              <span className="text-gray-700 text-sm font-medium mb-1 block">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    const newErrors = { ...errors };
                    delete newErrors.email;
                    setErrors(newErrors);
                  }
                }}
                className={`w-full p-2.5 border-2 ${
                  errors.email ? 'border-red-500' : 'border-gray-200'
                } rounded-md focus:border-black focus:outline-none transition-colors duration-200`}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </label>
          </div>

          <div>
            <label className="block">
              <span className="text-gray-700 text-sm font-medium mb-1 block">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    const newErrors = { ...errors };
                    delete newErrors.password;
                    setErrors(newErrors);
                  }
                }}
                className={`w-full p-2.5 border-2 ${
                  errors.password ? 'border-red-500' : 'border-gray-200'
                } rounded-md focus:border-black focus:outline-none transition-colors duration-200`}
                required
              />
              {isSignUp && password && (
                <div className="mt-1">
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, index) => (
                      <div
                        key={index}
                        className={`h-1 flex-1 rounded-full ${
                          index < getPasswordStrength(password).strength
                            ? 'bg-black'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs ${
                    getPasswordStrength(password).strength >= 4 
                      ? 'text-green-600' 
                      : 'text-gray-500'
                  }`}>
                    {getPasswordStrength(password).label}
                  </p>
                </div>
              )}
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </label>
          </div>

          {isSignUp && (
            <div>
              <label className="block">
                <span className="text-gray-700 text-sm font-medium mb-1 block">Confirm Password</span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) {
                      const newErrors = { ...errors };
                      delete newErrors.confirmPassword;
                      setErrors(newErrors);
                    }
                  }}
                  className={`w-full p-2.5 border-2 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                  } rounded-md focus:border-black focus:outline-none transition-colors duration-200`}
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </label>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-2.5 rounded-md hover:bg-gray-800 transform transition-all duration-300 hover:scale-[1.02] text-base font-medium"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center border-2 border-gray-200 py-2.5 rounded-md hover:bg-gray-50 transition-all duration-300"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="mr-2" size={20} />
            <span className="text-gray-700">
              {isSignUp ? "Sign up" : "Sign in"} with Google
            </span>
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrors({});
              setAlert(null);
            }}
            className="text-black font-medium hover:text-gray-700 transition-colors duration-300"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}