import React from 'react';
import { LogOut } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 sm:px-6 py-4 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand logo */}
        <Logo size="sm" />

        {/* User profile details and Logout action */}
        {user && (
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-sm font-semibold text-slate-800 leading-tight">
                {user.name}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                +91 {user.phone}
              </span>
            </div>
            
            {/* Avatar Preview */}
            <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-100 transition-all duration-200"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
