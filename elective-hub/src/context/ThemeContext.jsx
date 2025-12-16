import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();



export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('electiveFlowTheme');
    if (stored) setIsDark(stored === 'dark');
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem('electiveFlowTheme', !isDark ? 'dark' : 'light');
  };

  const light = {
    bg: 'bg-stone-50', 
    nav: 'bg-white/80 border-white/50 shadow-sm backdrop-blur-xl', 
    card: 'bg-white border-stone-300 shadow-sm', 
    text: { pri: 'text-stone-900', sec: 'text-stone-900', acc: 'text-orange-600' },
    btn: { pri: 'bg-orange-600 text-white hover:bg-orange-700 shadow-orange-500/20', sec: 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50' },
    border: 'border-stone-400', 
    accGrad: 'from-orange-600 to-amber-500',
    input: { bg: 'bg-transparent', border: 'border-stone-200', focus: 'focus:border-orange-500 focus:ring-orange-200' },
    ui: { iconBg: 'bg-orange-300 text-orange-600' }
  };
  
  const dark = {
    bg: 'bg-zinc-950', 
    nav: 'bg-zinc-900/80 border-zinc-800 shadow-xl backdrop-blur-xl',
    card: 'bg-zinc-900 border-zinc-800', 
    text: { pri: 'text-zinc-100', sec: 'text-zinc-400', acc: 'text-violet-400' },
    btn: { pri: 'bg-violet-600 text-white hover:bg-violet-500 shadow-violet-900/20', sec: 'bg-zinc-800 text-zinc-300 border-zinc-700' },
    border: 'border-zinc-800', 
    accGrad: 'from-violet-400 to-fuchsia-500',
    input: { bg: 'bg-transparent', border: 'border-zinc-700', focus: 'focus:border-violet-500 focus:bg-white/5' },
    ui: { iconBg: 'bg-zinc-800' }
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme: { isDark, ...(isDark ? dark : light) } }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);