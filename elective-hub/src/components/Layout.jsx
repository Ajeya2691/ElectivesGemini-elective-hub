import React from 'react';
import { GraduationCap, Sun, Moon, Shield, LogOut, Github, Twitter, Linkedin, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Button } from './UI';


export const Navbar = ({ session, userRole, setView, handleLogout }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <nav className={`fixed top-6 inset-x-0 mx-auto max-w-3xl z-50 rounded-full border ${theme.nav} px-6 h-14 flex items-center justify-between`}>
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('home')}>
        <div className={`p-1.5 rounded-full ${isDark ? 'bg-violet-500/20' : 'bg-orange-500'}`}>
          <GraduationCap className={`h-5 w-5 ${theme.text.acc}`} />
        </div>
        <span className="font-bold tracking-tight">Elective Discussion</span>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={toggleTheme} className={`p-2 rounded-full ${theme.btn.sec} border-none`}>
          {isDark ? <Sun className="h-4 w-4"/> : <Moon className="h-4 w-4"/>}
        </button>
        {session ? (
          <div className="flex items-center gap-2">
            {userRole === 'admin' && (
              <Button variant="ghost" onClick={() => setView('admin')} className="!p-2 !rounded-full">
                <Shield className="h-4 w-4"/>
              </Button>
            )}
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${isDark ? 'bg-zinc-800' : 'bg-stone-200'}`}>
              {session.user.email[0].toUpperCase()}
            </div>
            <Button variant="ghost" onClick={handleLogout} className="!p-2 !rounded-full">
              <LogOut className="h-4 w-4"/>
            </Button>
          </div>
        ) : (
          <Button onClick={() => setView('login')} className="!py-1.5 !px-5 !text-xs !rounded-full">Login</Button>
        )}
      </div>
    </nav>
  );
};

export const Footer = ({ setView }) => {
  const { theme } = useTheme();
  
  return (
    <footer className={`py-16 ${theme.border} border-t bg-opacity-50`}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
             <div className={`p-1.5 rounded-lg ${theme.ui.iconBg}`}>
                <GraduationCap className="h-6 w-6 text-white" />
             </div>
             <span className="font-bold text-xl">Elective Discussion</span>
          </div>
          <p className={`text-xs mt-4 font-bold ${theme.text.acc}`}>New exciting features coming up in the future!</p>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-sm uppercase">Platform</h4>
          <ul className={`space-y-2 text-sm ${theme.text.sec}`}>
            <li><button onClick={() => setView('home')} className="hover:underline text-left">Catalog</button></li>
            <li><button onClick={() => setView('login')} className="hover:underline text-left">Login</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-sm uppercase">Resources</h4>
          <ul className={`space-y-2 text-sm ${theme.text.sec}`}>
            <li><button onClick={() => setView('guidelines')} className="hover:underline text-left">Guidelines</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-sm uppercase">Connect</h4>
          <Button variant="secondary" className="!text-xs" onClick={() => setView('whoami')}>Who am I</Button>
          <p className={`mt-4 text-xs ${theme.text.sec}`}>© 2024 Elective Discussion Inc.</p>
        </div>
      </div>
    </footer>
  );
};
