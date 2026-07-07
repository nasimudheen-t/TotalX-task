import React from 'react';
import { Camera } from 'lucide-react';

interface AvatarProps {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
];

export const Avatar: React.FC<AvatarProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Current Selection Preview */}
      <div className="relative group">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-600 bg-slate-50 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105">
          {value ? (
            <img
              src={value}
              alt="Avatar Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-slate-400 font-bold text-2xl">TX</div>
          )}
        </div>
        {!disabled && (
          <div className="absolute bottom-0 right-0 p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full cursor-pointer shadow-md transition-colors duration-200">
            <Camera size={14} />
          </div>
        )}
      </div>

      {/* Preset Selections */}
      <div className="flex flex-col items-center space-y-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Choose a Profile Picture
        </span>
        <div className="flex space-x-3">
          {AVATAR_PRESETS.map((url, index) => {
            const isSelected = value === url;
            return (
              <button
                key={index}
                type="button"
                disabled={disabled}
                onClick={() => onChange(url)}
                className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all duration-200 hover:scale-105 active:scale-95 disabled:scale-100 disabled:opacity-50
                  ${
                    isSelected
                      ? 'border-indigo-600 ring-2 ring-indigo-100 shadow-md scale-105'
                      : 'border-slate-200 hover:border-indigo-300'
                  }`}
              >
                <img
                  src={url}
                  alt={`Preset ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Avatar;
