import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { sendOtp, clearError } from '../../redux/auth/authSlice';
import PageContainer from '../../components/ui/PageContainer';
import Card from '../../components/ui/Card';
import PhoneInput from '../../components/auth/PhoneInput';
import Button from '../../components/ui/Button';
import ErrorMessage from '../../components/ui/ErrorMessage';
import { auth } from '../../firebase/firebase';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error: reduxError, isAuthenticated } = useAppSelector((state) => state.auth);

  const [phone, setPhone] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  console.log("auth",auth)
  // Clear errors when mounting or typing
  useEffect(() => {
    dispatch(clearError());
    setValidationError(null);
  }, [phone, dispatch]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone) {
      setValidationError('Phone number is required.');
      return;
    }

    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      setValidationError('Please enter a valid 10-digit phone number.');
      return;
    }

    setValidationError(null);

    const result = await dispatch(sendOtp(phone));
    if (sendOtp.fulfilled.match(result)) {
      navigate('/verify');
    }
  };

  const activeError = validationError || reduxError;

  return (
    <PageContainer centered={false} className="p-0 bg-white min-h-screen">
      <main className="w-full min-h-screen flex items-center justify-center px-5 sm:px-10 py-8">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
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
                <span>Login</span>
              </div>
            </div>

            <Card className="p-0 bg-transparent border-0 shadow-none">
              <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                {/* Heading & Subtitle */}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
                    Welcome back
                  </h1>
                  <p className="text-slate-500 text-sm mt-0.5">
                    Enter your phone number to sign in or sign up to your account.
                  </p>
                </div>

                {/* Error Area */}
                <ErrorMessage message={activeError} />

                {/* Phone Input with +91 */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-sm font-semibold text-slate-700">
                    Enter mobile number
                  </label>
                  <PhoneInput
                    value={phone}
                    onChange={setPhone}
                    disabled={loading}
                    error={validationError ? '' : undefined}
                  />
                </div>

                {/* Send OTP Button - full width */}
                <Button
                  type="submit"
                  loading={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold py-3.5 px-6 rounded-full shadow-lg shadow-indigo-200/50 transition-all text-base"
                >
                  Send OTP
                </Button>
              </form>
            </Card>

            {/* Footer Text */}
            <p className="text-center text-xs text-slate-400 font-medium px-4 leading-relaxed">
              By proceeding, you agree to our{' '}
              <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a>{' '}
              and{' '}
              <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
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
      </main>
    </PageContainer>
  );
};

export default Login;