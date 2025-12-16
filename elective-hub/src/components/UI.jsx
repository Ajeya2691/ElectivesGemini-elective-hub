import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const { theme } = useTheme();
  const v = { 
    primary: theme.btn.pri, 
    secondary: theme.btn.sec, 
    ghost: `hover:bg-current hover:bg-opacity-5 ${theme.text.sec}` 
  };
  return (
    <button 
      onClick={onClick} 
      className={`px-5 py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all active:scale-95 ${v[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export const Card = ({ children, className = '', ...props }) => {
  const { theme } = useTheme();
  return (
    <div className={`p-6 rounded-2xl border ${theme.card} transition-all duration-300 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const Badge = ({ children, accent = false }) => {
  const { theme, isDark } = useTheme();
  const style = accent 
    ? (isDark ? 'bg-violet-500/10 text-violet-300 border-violet-500/20' : 'bg-orange-50 text-orange-700 border-orange-100')
    : (isDark ? 'bg-zinc-800 text-zinc-400' : 'bg-stone-900 text-stone-100');
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border border-transparent ${style}`}>
      {children}
    </span>
  );
};