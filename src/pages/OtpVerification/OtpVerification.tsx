import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { verifyOtp, sendOtp, clearError } from '../../redux/auth/authSlice';
import PageContainer from '../../components/ui/PageContainer';
import Card from '../../components/ui/Card';
import Logo from '../../components/common/Logo';
import SectionTitle from '../../components/ui/SectionTitle';
import OTPInput from '../../components/auth/OTPInput';
import Button from '../../components/ui/Button';
import ErrorMessage from '../../components/ui/ErrorMessage';

export const OtpVerification: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { phone, loading, error: reduxError, isAuthenticated, user } = useAppSelector((state) => state.auth);

  const [otp, setOtp] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [timer, setTimer] = useState(30);

  // Redirect back to login if phone number is missing
  useEffect(() => {
    if (!phone) {
      navigate('/');
    }
  }, [phone, navigate]);

  // Handle countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Clear errors when otp changes
  useEffect(() => {
    dispatch(clearError());
    setValidationError(null);
  }, [otp, dispatch]);

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate('/home');
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setValidationError('Please enter all 6 digits of the OTP.');
      return;
    }

    setValidationError(null);

    const result = await dispatch(verifyOtp(otp));
    if (verifyOtp.fulfilled.match(result)) {
      const { isRegistered } = result.payload;
      if (isRegistered) {
        navigate('/home');
      } else {
        navigate('/register');
      }
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    setOtp('');
    setValidationError(null);
    const result = await dispatch(sendOtp(phone));
    if (sendOtp.fulfilled.match(result)) {
      setTimer(30);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const activeError = validationError || reduxError;

  return (
    <PageContainer>
      <div className="w-full max-w-md flex flex-col space-y-6">
        {/* App Logo */}
        <Logo size="lg" />

        <Card>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            {/* Header & Subtitle */}
            <SectionTitle
              title="Verify Phone"
              subtitle={`We've sent a 6-digit verification code to +91 ${phone || 'xxxx-xxxxxx'}`}
            />

            {/* Error Message */}
            <ErrorMessage message={activeError} />

            {/* 6-Digit Code Box */}
            <OTPInput
              value={otp}
              onChange={setOtp}
              disabled={loading}
              error={validationError ? '' : undefined}
            />

            {/* Verification Button */}
            <Button
              type="submit"
              loading={loading}
              className="w-full py-3.5"
            >
              Verify OTP
            </Button>

            {/* Timer and Resend Actions */}
            <div className="flex flex-col items-center justify-center space-y-2 mt-2">
              {timer > 0 ? (
                <div className="text-xs font-semibold text-slate-400">
                  Resend code in <span className="text-indigo-600 font-bold">{formatTimer(timer)}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700 focus:outline-none focus:underline hover:underline transition-colors duration-150"
                >
                  Resend OTP
                </button>
              )}
            </div>

            {/* Back Button */}
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center space-x-2 text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors duration-150 py-1"
            >
              <ArrowLeft size={14} />
              <span>Back to Login</span>
            </button>
          </form>
        </Card>
      </div>
    </PageContainer>
  );
};

export default OtpVerification;
