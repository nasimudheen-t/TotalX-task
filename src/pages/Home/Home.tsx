import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, User, ShieldCheck, LogIn, ArrowRight } from 'lucide-react';
import { useAppSelector } from '../../hooks/redux';
import PageContainer from '../../components/ui/PageContainer';
import Card from '../../components/ui/Card';
import Navbar from '../../components/common/Navbar';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <PageContainer centered={false} className="p-0 bg-white min-h-screen">
      <Navbar />

      <main className="w-full mx-auto px-5 sm:px-10 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* LEFT: Login card */}
          <div className="w-full max-w-md mx-auto lg:mx-0 flex flex-col space-y-5 animate-fade-in">
            {/* Header: TOTAL logo + Login */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 bg-slate-900 text-white text-sm font-extrabold tracking-tight px-4 py-2 rounded-full">
                <span>TOTAL</span>
                <span className="bg-amber-400 text-slate-900 w-5 h-5 rounded-full flex items-center justify-center text-xs">
                  X
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                <LogIn size={18} className="text-indigo-600" />
                <span>Login</span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
                Login
              </h1>
              <p className="text-slate-500 text-sm mt-0.5">
                Login to access your travewise account
              </p>
            </div>

            {/* Mobile Number Input */}
            <div className="space-y-1.5">
              <label htmlFor="mobile" className="text-sm font-semibold text-slate-700">
                Enter mobile number
              </label>
              <div className="flex items-center bg-slate-100 rounded-2xl px-4 py-0.5 border-2 border-transparent focus-within:border-indigo-600 focus-within:bg-white focus-within:shadow-md transition-all">
                <Phone size={18} className="text-slate-400 mr-3" />
                <input
                  id="mobile"
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full bg-transparent py-3.5 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
                  defaultValue="+91 98765 43210"
                />
              </div>
            </div>

            {/* Get OTP Button - full width */}
            <button
              type="button"
              className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold py-3.5 px-6 rounded-full shadow-lg shadow-indigo-200/50 flex items-center justify-center gap-2 transition-all text-base"
            >
              <span>Get OTP</span>
              <ArrowRight size={18} strokeWidth={2.5} />
            </button>

            {/* Sign up link */}
            <p className="text-center text-sm text-slate-600 mt-1">
              Don't have an account?{' '}
              <a href="#" className="font-bold text-indigo-600 hover:underline">
                Sign up
              </a>
            </p>
          </div>

          {/* RIGHT: Illustration panel */}
          <div className="hidden lg:flex items-center justify-center bg-slate-50 rounded-3xl p-10 h-[420px]">
            <svg
              viewBox="0 0 260 300"
              className="w-56 h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Shield with check */}
              <g transform="translate(150,10)">
                <path
                  d="M35 0 L68 12 V38 C68 62 52 78 35 86 C18 78 2 62 2 38 V12 Z"
                  fill="#ffffff"
                  stroke="#e2e8f0"
                  strokeWidth="2"
                />
                <path
                  d="M35 6 L62 16 V38 C62 58 49 72 35 79 C21 72 8 58 8 38 V16 Z"
                  fill="#86efac"
                />
                <path
                  d="M22 40 L31 49 L49 28"
                  fill="none"
                  stroke="#166534"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>

              {/* Phone */}
              <g transform="translate(60,70)">
                <rect
                  x="0"
                  y="0"
                  width="110"
                  height="190"
                  rx="16"
                  fill="#ffffff"
                  stroke="#4338ca"
                  strokeWidth="3"
                />
                <rect x="10" y="14" width="90" height="140" rx="4" fill="#eef2ff" />
                {/* Lock icon */}
                <g transform="translate(40,45)">
                  <rect x="0" y="14" width="30" height="24" rx="4" fill="#4338ca" />
                  <path
                    d="M6 14 V8 a9 9 0 0 1 18 0 v6"
                    fill="none"
                    stroke="#4338ca"
                    strokeWidth="4"
                  />
                  <circle cx="15" cy="26" r="3" fill="#ffffff" />
                </g>
                {/* Dots row */}
                <g transform="translate(30,115)">
                  <circle cx="0" cy="0" r="4" fill="#facc15" />
                  <circle cx="16" cy="0" r="4" fill="#facc15" />
                  <circle cx="32" cy="0" r="4" fill="#facc15" />
                  <circle cx="48" cy="0" r="4" fill="#e2e8f0" />
                </g>
                {/* Home indicator */}
                <rect x="40" y="178" width="30" height="4" rx="2" fill="#c7d2fe" />
              </g>

              {/* Hand holding phone */}
              <g transform="translate(30,230)">
                <path
                  d="M0 40 C0 20 15 5 40 5 H150 C170 5 185 20 185 40 V70 H0 Z"
                  fill="#6366f1"
                />
                <path
                  d="M60 5 C60 -15 90 -15 90 5 V25 H60 Z"
                  fill="#fcd9b8"
                />
                <ellipse cx="75" cy="8" rx="15" ry="10" fill="#fcd9b8" />
              </g>
            </svg>
          </div>
        </div>

        {/* ===== AUTHENTICATED USER PROFILE ===== */}
        <div className="max-w-5xl mx-auto mt-10 space-y-5">
          <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 rounded-2xl p-5 text-white shadow-lg shadow-indigo-200/40 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold w-fit border border-white/10">
              <ShieldCheck size={14} className="text-emerald-300" />
              <span className="text-indigo-50">Securely Authenticated</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-3">
              Welcome back, {user.name}! 🎉
            </h2>
            <p className="text-indigo-100 text-sm max-w-xl font-medium leading-relaxed">
              You have successfully completed your phone authentication. Your profile is active and secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-1 flex flex-col items-center justify-center p-5 space-y-3 bg-white border border-slate-200/80 shadow-sm rounded-2xl">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-50 ring-4 ring-indigo-100/40 bg-slate-100 shadow-inner">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-center">
                <h3 className="text-base font-bold text-slate-800">{user.name}</h3>
                <p className="text-[11px] font-bold text-indigo-600 mt-0.5">Verified Member</p>
              </div>
            </Card>

            <Card className="md:col-span-2 p-5 bg-white border border-slate-200/80 shadow-sm rounded-2xl">
              <h3 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-100">
                User Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                    <User size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Name</p>
                    <p className="text-sm font-semibold text-slate-700">{user.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email</p>
                    <p className="text-sm font-semibold text-slate-700 truncate max-w-[160px]" title={user.email}>
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:col-span-2">
                  <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verified Phone</p>
                    <p className="text-sm font-semibold text-slate-700">+91 {user.phone}</p>
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-slate-400 font-medium pt-3 border-t border-slate-100/60 mt-4">
                Session: {new Date().toLocaleString()}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </PageContainer>
  );
};

export default Home;