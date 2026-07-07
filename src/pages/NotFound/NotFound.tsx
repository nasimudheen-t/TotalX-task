import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import PageContainer from '../../components/ui/PageContainer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleBack = () => {
    if (isAuthenticated) {
      navigate('/home');
    } else {
      navigate('/');
    }
  };

  return (
    <PageContainer>
      <div className="w-full max-w-md flex flex-col space-y-6">
        <Card className="flex flex-col items-center text-center p-8 sm:p-12 space-y-6">
          {/* Custom Modern 404 Illustration */}
          <div className="w-48 h-48 flex items-center justify-center bg-indigo-50/50 rounded-full relative animate-pulse">
            <svg
              className="w-36 h-36 text-indigo-600"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="100" cy="100" r="80" fill="#EEF2F6" />
              <path
                d="M75 115C85 125 115 125 125 115"
                stroke="#4F46E5"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <circle cx="75" cy="85" r="10" fill="#4F46E5" />
              <circle cx="125" cy="85" r="10" fill="#4F46E5" />
              <path
                d="M145 50L165 70"
                stroke="#8B5CF6"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M35 150L55 130"
                stroke="#8B5CF6"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute top-2 right-2 px-3 py-1 bg-violet-600 text-white text-xs font-black rounded-full shadow-lg">
              404
            </span>
          </div>

          <div className="flex flex-col space-y-2">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              Page Not Found
            </h2>
            <p className="text-sm font-medium text-slate-500 max-w-sm">
              We couldn't find the page you were looking for. It might have been moved or doesn't exist.
            </p>
          </div>

          <Button
            onClick={handleBack}
            className="px-8 py-3"
          >
            Back to Home
          </Button>
        </Card>
      </div>
    </PageContainer>
  );
};

export default NotFound;
