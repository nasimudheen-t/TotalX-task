import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-slate-50">
      {children}
    </div>
  );
};

export default AuthLayout;
