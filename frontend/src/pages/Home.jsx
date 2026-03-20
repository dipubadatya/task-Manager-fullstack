import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// Lightweight, modern icons
import { CheckCircle2, Shield, Zap, ArrowRight, Sparkles } from "lucide-react";

const Home = () => {
  const { token } = useAuth();

  return (
    // Background: #F2E9E4 | Font: Nunito
    <div className="min-h-screen bg-[#F2E9E4] font-['Nunito'] text-[#22223B] flex flex-col">

      {/* Navbar - Simple & Human */}
      <nav className="max-w-7xl mx-auto w-full px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-[#22223B] p-1.5 rounded-lg">
            <Sparkles size={18} className="text-[#FF006E]" />
          </div>
          <span className="text-xl font-black tracking-tight uppercase">TaskFlow</span>
        </div>
        {!token && (
          <Link to="/login" className="text-sm font-bold hover:text-[#FF006E] transition-colors">
            Sign In
          </Link>
        )}
      </nav>

      {/* Hero Section - Balanced for Mobile & Desktop */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6">
          Focus on what matters,<br />
          <span className="text-[#FF006E]">leave the rest to us.</span>
        </h1>

        <p className="text-[#9A8C98] text-lg md:text-xl font-medium max-w-2xl mb-10 leading-relaxed">
          A minimalist workspace designed to help you organize your daily tasks without the unnecessary noise.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {token ? (
            <Link
              to="/dashboard"
              className="px-8 py-4 bg-[#22223B] text-white rounded-2xl font-bold shadow-xl shadow-[#22223B]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Go to Dashboard <ArrowRight size={18} />
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="px-8 py-4 bg-[#22223B] text-white rounded-2xl font-bold shadow-xl shadow-[#22223B]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Start for free
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-white/50 border border-[#C9ADA7] text-[#22223B] rounded-2xl font-bold hover:bg-white transition-all flex items-center justify-center"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </main>


    </div>
  );
};

export default Home;
