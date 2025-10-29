"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Lock, Mail, ArrowRight, UserPlus, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";

const GoogleIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="24px"
    height="24px"
    className="w-6 h-6 mr-3"
  >
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.343c-1.812,4.721-6.494,8.232-11.343,8.232c-6.621,0-12-5.379-12-12s5.379-12,12-12c3.059,0,5.842,1.159,7.963,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.941,12,24,12c3.059,0,5.842,1.159,7.963,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.665,8.309,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.954-1.82,13.385-4.823l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.284-7.946l-6.522,5.025C9.501,38.563,16.223,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.343c-0.875,2.705-2.585,5.188-4.887,6.884l-5.657-5.657c-1.07-0.929-1.884-2.027-2.433-3.23l-0.003-0.013l-0.003-0.013l-0.002-0.009l-0.002-0.008l-0.001-0.003L14.655,31.81l-6.522,5.025C9.501,38.563,16.223,44,24,44c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Signup failed");

      // Redirect to the sign-in page after successful signup
      router.push("/auth/signin");
    } catch (err: any) {
      // Safely access the message property
      setError(
        err instanceof Error
          ? err.message
          : "An unknown error occurred during signup."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    // Full Page Layout with Warm Gradient Background and Abstract Shapes
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 bg-stone-50">
      {/* Background Gradient (Warm, Earthy Tones) */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-yellow-50 to-stone-100 opacity-90"></div>

      {/* Abstract Shapes (Soft, Organic Blobs) - Positioned slightly differently for visual interest */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-amber-400 opacity-10 rounded-full mix-blend-multiply filter blur-3xl"></div>
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-stone-500 opacity-10 rounded-full mix-blend-multiply filter blur-3xl"></div>

      {/* Sign-up Card Container */}
      <div className="relative z-10 w-full max-w-md bg-white p-10 rounded-2xl shadow-2xl border border-stone-100 backdrop-blur-sm">
        {/* Header Section */}
        <div className="text-center mb-8">
          <UserPlus className="w-10 h-10 text-amber-800 mx-auto mb-3" />
          <h1 className="text-3xl font-extrabold font-serif text-gray-900 mb-1">
            Create an Account
          </h1>
          <p className="text-stone-600 text-lg">
            Join Aceon Interio for exclusive access and offers.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Full Name"
              type="text"
              required
              className="w-full py-3 pl-10 pr-4 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-150 text-gray-800 placeholder-stone-400 bg-stone-50"
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              type="email"
              required
              className="w-full py-3 pl-10 pr-4 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-150 text-gray-800 placeholder-stone-400 bg-stone-50"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (min 6 characters)"
              type="password"
              required
              minLength={6}
              className="w-full py-3 pl-10 pr-4 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-150 text-gray-800 placeholder-stone-400 bg-stone-50"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-100 text-red-700 text-sm font-medium rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {/* Sign Up Button (Themed with amber accent) */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-amber-800 text-white font-semibold rounded-lg shadow-md hover:bg-amber-700 transition duration-200 disabled:bg-stone-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Sign Up</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </>
            )}
          </button>
          <button
            onClick={() => signIn("google")}
            className={`
                                w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-md font-semibold text-gray-700 
                                transition-all duration-300
                                disabled:opacity-80
                              `}
          >
            <GoogleIcon />
            Sign in with Google
          </button>
        </form>

        {/* Footer Link to Sign In */}
        <div className="mt-6 text-center">
          <Link
            href="/auth/signin"
            className="inline-flex items-center space-x-1 text-stone-600 font-medium hover:text-amber-800 transition duration-200 border-b border-transparent hover:border-amber-800"
          >
            <span>Already have an account?</span>
            <span className="font-semibold">Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
