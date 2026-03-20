import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, Loader2, Sparkles } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      // Simple error handling that looks manual
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2E9E4] flex flex-col justify-center items-center px-4">
      {/* Header Section */}
      <div className="w-full max-w-md text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-[#FF006E] rounded-xl mb-4 shadow-md">
          <Sparkles className="text-white" size={24} />
        </div>
        <h1 className="text-2xl font-bold text-[#22223B]">Welcome Back</h1>
        <p className="text-[#9A8C98] text-sm mt-1">Please enter your details to sign in</p>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-xs font-bold text-[#22223B] uppercase tracking-wider mb-2 ml-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#FF006E] focus:ring-1 focus:ring-[#FF006E] outline-none transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold text-[#22223B] uppercase tracking-wider mb-2 ml-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#FF006E] focus:ring-1 focus:ring-[#FF006E] outline-none transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#22223B] text-white rounded-xl font-semibold hover:bg-[#4A4E69] transition-colors disabled:opacity-50 flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#FF006E] font-bold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;